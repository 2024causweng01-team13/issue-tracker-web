import { CommonResponse, fetcher } from "@/apis";
import { useQuery } from "@tanstack/react-query";
import { DatePicker, Flex, Radio, Spin } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";

const { RangePicker } = DatePicker;

type Unit = "DAY" | "MONTH";

type AnalyticsByDateResponse = CommonResponse<{
  dateStatistics: {
    date: string;
    count: number;
  }[]
}>;

export const AnalyticsByDate = () => {
  const { projectId } = useParams();
  const [unit, setUnit] = useState<Unit>("DAY");
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date()).subtract(1, "month"));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()));
  const { data, isLoading } = useQuery({ 
    queryKey: ["projects/analytics/date", projectId, unit, startDate, endDate], 
    queryFn: () => fetcher.post<AnalyticsByDateResponse>("/api/v1/projects/analytics/member", { 
      projectId: Number(projectId ?? 0),
      unit,
      startDate,
      endDate,
    })
  });

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"] ?? data?.data.data?.dateStatistics.map((date) => date.date),
    },
  };

  const series = [{
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 91, 125] ?? data?.data.data?.dateStatistics.map((date) => date.count),
  }];

  const onDateChange = (dates: (Dayjs | null)[] | null) => {
    if (!dates) return;

    setStartDate(dates[0] ?? dayjs(new Date()).subtract(1, "month"));
    setEndDate(dates[1] ?? dayjs(new Date()));
  }

  return (
    <>
      <Flex gap="small" style={{ height: "100%" }}>
        <Radio.Group value={unit} onChange={(e) => setUnit(e.target.value)} style={{ paddingLeft: 16 }} >
          <Radio.Button value="DAY">일별</Radio.Button>
          <Radio.Button value="MONTH">월별</Radio.Button>
        </Radio.Group>
        <RangePicker value={[startDate, endDate]} onChange={onDateChange} />
      </Flex>
      {isLoading ? (
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          <div className="m-20">
            <Spin tip="로딩 중입니다" size="large" />
          </div>
        </Flex>
      ) : (
        <Chart type="line" options={options} series={series} />
      )}
    </>
  );
}