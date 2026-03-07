import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const BreadCrumb = () => {
  const navigate = useNavigate();
  const path: string[] = useSelector((state: any) => state.breadcrumb);
  console.log(path);
  return (
    <>
      {path.length > 2 && (
        <div className="bg-secondary pt-2 pl-[2%] flex flex-row flex-wrap gap-1">
          {path.map((item: string, index: number) => {
            return (
              <div>
                <a
                  className="text-primary cursor-pointer"
                  onClick={() =>
                    navigate(`/${path.slice(0, index + 1).join("/")}`)
                  }
                >
                  <Typography
                    textTransform={"uppercase"}
                    display={"inline"}
                    variant={"caption"}
                    letterSpacing={2}
                  >
                    {item.replaceAll("-", " ")}
                    {" / "}
                  </Typography>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default BreadCrumb;
