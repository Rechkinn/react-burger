import Modal from "../modal/modal";
import React, { FC } from "react";
import { TPropsWithReactNode } from "../../utils/types";

type TWrapperDetailsProps = {
  title?: string;
  additionalFunction?: () => void;
} & TPropsWithReactNode;

const WrapperDetails: FC<TWrapperDetailsProps> = React.memo(
  ({ element, title, additionalFunction }) => {
    return (
      <Modal
        functionToClose={() => {
          window.history.back();
          if (additionalFunction) additionalFunction();
        }}
        title={title}
      >
        {element}
      </Modal>
    );
  }
);

export default WrapperDetails;
