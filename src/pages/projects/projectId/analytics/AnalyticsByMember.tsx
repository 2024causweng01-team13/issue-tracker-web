import { CommonResponse, fetcher } from "@/apis";
import { useQuery } from "@tanstack/react-query";
import { Flex, Spin } from "antd";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";

enum IssueStatus {
  NEW = "NEW",
	ASSIGNED = "ASSIGNED",
	RESOLVED = "RESOLVED",
	CLOSED = "CLOSED",
	REOPENED = "REOPENED",
}

type AnalyticsByMemberResponse = CommonResponse<{
  memberStatistics: {
    name: string;
    issueStatistics: {
      status: IssueStatus;
      count: number;
    }[]
  }[]
}>;

export const AnalyticsByMember = () => {
  const { projectId } = useParams();
  const { data, isLoading } = useQuery({ 
    queryKey: ["projects/analytics/member", projectId], 
    queryFn: () => fetcher.post<AnalyticsByMemberResponse>("/api/v1/projects/analytics/member", { projectId: Number(projectId ?? 0) })
  });

  const options = {
    chart: {
      id: "basic-bar",
      stacked: true,
    },
    xaxis: {
      categories: data?.data.data?.memberStatistics.map((member) => member.name),
    }
  };

  const series = Object.values(IssueStatus).map((status) => ({
    name: status,
    data: data?.data.data ? data?.data.data?.memberStatistics.map((member) => member.issueStatistics.find((issue) => issue.status === status)?.count ?? 0) : [],
  }));

  return (
    <>
      {isLoading ? (
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          <div className="m-20">
            <Spin tip="로딩 중입니다" size="large" />
          </div>
        </Flex>
      ) : (
        <Chart type="bar" options={options} series={series} />
      )}
    </>
  )
}