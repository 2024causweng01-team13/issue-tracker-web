import { fetcher } from "@/apis";
import { useUser } from "@/pages/UserContext";
import { useMutation } from "@tanstack/react-query";
import { Button, Input, Modal, message } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

type FixIssueModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onFixSuccess: () => void;
}

export const FixIssueModal = ({ isVisible, setIsVisible, onFixSuccess }: FixIssueModalProps) => {
  const { id: issueId } = useParams<{ id: string }>();
  const { user } = useUser();
  const [comment, setComment] = useState<string>('');

  const { mutate: fixIssueMutate, isPending } = useMutation({
    mutationFn: () => fetcher.post(`/api/v1/issues/${issueId}/fix`, {
      fixerId: user?.id,
      comment
    }),
    onSuccess: () => {
      message.success('이슈가 할당되었습니다.');
      onFixSuccess();
      setIsVisible(false);
    },
    onError: (error) => {
      message.error('이슈 할당에 실패했습니다.' + (error as AxiosError).response?.data?.message ?? error.message);
    }
  })

  const handleFix = () => {
    fixIssueMutate();
  }

  return (
    <Modal
      title="유저 검색"
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
    >
      <h5 className="mb-1">코멘트</h5>
      <Input.TextArea
        placeholder="코멘트를 입력하세요."
        onChange={e => setComment(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button onClick={handleFix} loading={isPending}>해결 처리하기</Button>
    </Modal>
  )
}