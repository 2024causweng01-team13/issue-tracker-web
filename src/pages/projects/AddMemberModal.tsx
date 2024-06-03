import { CommonResponse, fetcher } from "@/apis";
import { useUser } from "@/pages/UserContext";
import useDebounce from "@/utils/useDebounce";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Input, List, Modal, Spin, message } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

type User = {
  id: number;
  name: string;
};

type AddMemberModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onAddMemberSuccess: () => void;
}

type FindUsersResponse = CommonResponse<{
  users: User[];
}>;

export const AddMemberModal = ({ isVisible, setIsVisible, onAddMemberSuccess }: AddMemberModalProps) => {
  const { projectId } = useParams();
  const { user } = useUser();
  const [member, setMember] = useState<User | null>(null);

  const [username, setUsername] = useState<string>('');
  const debouncedUsername = useDebounce({ value: username, delay: 500 });

  const { data, isLoading } = useQuery({
    queryKey: ['users', projectId, 'AddMemberModal'],
    queryFn: async () => {
      if (!debouncedUsername) {
        return;
      }

      return fetcher.post<FindUsersResponse>('/api/v1/users/find', {
        name: debouncedUsername
      });
    }
  });

  const { mutate: addMemberMutate, isPending } = useMutation({
    mutationFn: () => fetcher.post(`/api/v1/projects/${projectId}/members`, {
      adderId: user?.id,
      memberId: member?.id,
    }),
    onSuccess: () => {
      message.success('멤버가 추가되었습니다.');
      onAddMemberSuccess();
      setIsVisible(false);
    },
    onError: (error) => {
      message.error('멤버 추가에 실패했습니다.' + (error as AxiosError).response?.data?.message ?? error.message);
    }
  })

  const onSelect = (user: User) => {
    setMember(user);
  }

  const handleAdd = () => {
    addMemberMutate();
  }

  return (
    <Modal
      title="유저 검색"
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
    >
      <h3 className="mb-1">추가할 유저 <mark>{member?.name}</mark></h3>
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
      <Button type="primary" onClick={handleAdd} loading={isPending} className="mt-2">추가하기</Button>
    </Modal>
  )
}