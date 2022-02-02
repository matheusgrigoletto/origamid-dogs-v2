import { useEffect, useState } from "react";
import { VictoryPie, VictoryBar, VictoryChart } from "victory";

import styles from "./UserStatsGraphs.module.css";

type UserStatsData = {
  acessos: string;
  id: number;
  title: string;
};

type UserStatsGraphsProps = {
  data: UserStatsData[];
};

type GraphData = {
  x: string;
  y: number;
};

export const UserStatsGraphs = ({ data }: UserStatsGraphsProps) => {
  const [graph, setGraph] = useState<GraphData[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(
      data
        .map((item) => Number(item.acessos))
        .reduce((acc, num) => acc + num, 0),
    );

    const graphData = data.map((item) => ({
      x: item.title,
      y: Number(item.acessos),
    }));

    setGraph(graphData);
  }, [data]);

  return (
    <section className={`${styles.graph} slideIn`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{
            top: 20,
            bottom: 20,
            left: 80,
            right: 80,
          }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: "#fff",
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: "#333",
            },
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar data={graph} alignment="start" />
        </VictoryChart>
      </div>
    </section>
  );
};
