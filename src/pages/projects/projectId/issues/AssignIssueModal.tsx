import { CommonResponse, fetcher } from "@/apis";
import { useUser } from "@/pages/UserContext";
import useDebounce from "@/utils/useDebounce";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Divider, Input, List, Modal, Spin, message } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

type User = {
  id: number;
  name: string;
};

type AssignIssueModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onAssignSuccess: () => void;
}

type FindUsersResponse = CommonResponse<{
  users: User[];
}>;

export const AssignIssueModal = ({ isVisible, setIsVisible, onAssignSuccess }: AssignIssueModalProps) => {
  const { id: issueId } = useParams<{ id: string }>();
  const { user } = useUser();
  const [assignee, setAssignee] = useState<User | null>(null);

  const [comment, setComment] = useState<string>('');

  const [username, setUsername] = useState<string>('');
  const debouncedUsername = useDebounce({ value: username, delay: 500 });

  const { data, isLoading } = useQuery({
    queryKey: ['users', issueId, 'AssignIssueModal'],
    queryFn: async () => {
      if (!debouncedUsername) {
        return;
      }

      return fetcher.post<FindUsersResponse>('/api/v1/users/find', {
        name: debouncedUsername
      });
    }
  });

  const { mutate: assignIssueMutate, isPending } = useMutation({
    mutationFn: () => fetcher.post(`/api/v1/issues/${issueId}/assign`, {
      assignerId: user?.id,
      assigneeId: assignee?.id,
      comment
    }),
    onSuccess: () => {
      message.success('이슈가 할당되었습니다.');
      onAssignSuccess();
      setIsVisible(false);
    },
    onError: (error) => {
      message.error('이슈 할당에 실패했습니다.' + (error as AxiosError).response?.data?.message ?? error.message);
    }
  })

  const onSelect = (user: User) => {
    setAssignee(user);
  }

  const handleAssign = () => {
    assignIssueMutate();
  }

  return (
    <Modal
      title="유저 검색"
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
    >
      <h3 className="mb-1">할당할 유저 <mark>{assignee?.name}</mark></h3>
      <Input
        type="text"
        placeholder="유저 이름을 입력하세요."
        onChange={e => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      {isLoading ? (
        <Spin />
      ) : (
        <List
          bordered
          dataSource={data?.data?.data?.users ?? []}
          renderItem={(item) => (
            <List.Item id={item.id.toString()} onClick={() => onSelect(item)} className="hover:bg-slate-200">
              {item.name}
            </List.Item>
          )}
        />
      )}
      <Divider />
      <h5 className="mb-1">코멘트</h5>
      <Input.TextArea
        placeholder="코멘트를 입력하세요."
        onChange={e => setComment(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button onClick={handleAssign} loading={isPending}>할당하기</Button>
    </Modal>
  )
}