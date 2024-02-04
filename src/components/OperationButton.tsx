import { Button } from "@nextui-org/react";

import OperationButtonProps from "~/types/operationButton.type";

function OperationButton(props: OperationButtonProps) {
  return (
    <Button
      size="lg"
      radius="md"
      data-testid={props.testId}
      onClick={props.onClick}
      className={props.className + " text-xl font-medium bg-[#F66B0E]"}
    >
      {props.operation}
    </Button>
  );
}

export default OperationButton;
