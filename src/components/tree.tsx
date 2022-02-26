import useTree from "../hooks/useTree";
import Leaf from "./leaf";

const Tree = () => {
   const { data } = useTree("");

  return (
    <div className="/">
      <div className="mb-1">
        <strong>{data?.path}</strong>
      </div>

      {data?.children?.map((node: any, key: number) => {
        return (
          <div key={key}>
            <Leaf props={node} />
          </div>
        );
      })}
    </div>
  );
};

export default Tree;
