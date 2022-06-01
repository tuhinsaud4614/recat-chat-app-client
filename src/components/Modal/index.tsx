import classNames from "classnames";
import { AnimatePresence, motion, Variants } from "framer-motion";
import * as React from "react";
import { useSplitElement } from "../../hooks";
import Backdrop from "../Backdrop";
import Portal from "../Portal";
import Body from "./Body";
import ModalContext from "./context";
import Foot from "./Foot";
import Head from "./Head";

const className = {
  container:
    "fixed z-[911] top-1/2 left-1/2 max-h-[calc(100vh-32px)] w-[calc(100%-32px)] sm:max-w-[calc(640px-32px)] flex flex-col bg-white shadow-mine-2 rounded-2xl overflow-hidden",
};

const containerVariants: Variants = {
  hidden: {
    y: "-100vh",
    x: "-50%",
    opacity: 0,
  },
  visible: {
    y: "-50%",
    x: "-50%",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface Props {
  classes?: {
    backdrop?: string;
    container?: string;
  };
  onHide(): void;
  open: boolean;
  staticBack?: boolean;
  children?: React.ReactNode;
}

function ModalComponent({
  onHide,
  open,
  staticBack,
  classes,
  children,
}: Props) {
  const { head, body, foot } = useSplitElement(children, {
    head: Head,
    body: Body,
    foot: Foot,
  });
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <Backdrop
            role="dialog"
            onClick={!staticBack ? onHide : undefined}
            className={classNames(
              "z-[910]",
              !staticBack && "cursor-pointer",
              classes?.backdrop
            )}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classNames(className.container, classes?.container)}
          >
            <ModalContext.Provider value={{ onHide: onHide }}>
              {head}
              {body}
              {foot}
            </ModalContext.Provider>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

const Modal = Object.assign(ModalComponent, { Head, Body, Foot });
export default Modal;
