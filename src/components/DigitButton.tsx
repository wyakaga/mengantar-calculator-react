import { Button } from "@nextui-org/react";

import DigitButtonProps from "~/types/digitButton.type";

function DigitButton(props: DigitButtonProps) {
  return (
    <Button
      size="lg"
      data-testid={props.testId}
      radius="md"
      onClick={props.onClick}
      className={props.className + " text-xl font-medium bg-[#205375]"}
    >
      {props.digit}
    </Button>
  );
}

export default DigitButton;
