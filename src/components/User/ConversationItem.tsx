import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAvatar, useRipple } from "../../hooks";
import { getUserName } from "../../utils";
import { IUser } from "../../utils/interfaces";
import Avatar from "../Avatar";
import Badge from "../Badge";
import ListTile from "../ListTile";

const className = {
  root: "cursor-pointer group rounded-lg relative",
  tile: "w-full group-hover:bg-primary/10 rounded-lg",
  leading: "py-2.5 pl-2.5",
  avatar: "w-10 h-10 overflow-hidden rounded-full border",
  avatarText:
    "w-10 h-10 border-2 border-secondary text-secondary text-xl uppercase rounded-full",
  tileTitles: "p-2.5",
  tileTitle: "line-clamp-1 text-sm font-medium text-zinc-700 capitalize",
  titleSubtitle: "mt-1 flex items-start text-xs text-zinc-500",
  tailing: "pl-2",
  menuBtn:
    "hidden group-hover:flex items-center justify-center w-8 h-8 bg-zinc-50 rounded-full absolute z-10 right-9 top-1/2 -translate-y-1/2 shadow-mine-2 active:shadow-none",
};

interface Props {
  user: IUser;
}

export default function ConversationItem({ user }: Props) {
  const avatar = useAvatar({
    user,
    className: {
      text: className.avatarText,
      icon: className.avatarText,
      main: className.avatar,
    },
  });
  const { mouseEvent } = useRipple({
    className: "bg-primary/20",
  });
  return (
    <li className={className.root}>
      <Avatar.Icon
        icon={HiDotsHorizontal}
        size={20}
        className="text-[#bcc0c4]"
        rootClassName={className.menuBtn}
      />
      <ListTile
        className={className.tile}
        classes={{ main: className.tileTitles }}
        onClick={(e) => {
          mouseEvent(e);
        }}
      >
        <ListTile.Leading className={className.leading}>
          <Badge variant="dot">{avatar}</Badge>
        </ListTile.Leading>
        <ListTile.Title className={className.tileTitle}>
          {getUserName(user)}
        </ListTile.Title>
        <ListTile.Subtitle className={className.titleSubtitle}>
          <span className="line-clamp-1 flex-grow">
            You: ghhfgh gfhfg hhghg hfghfg hgffhf gfhg hfgfhfh
          </span>
          <span className="inline-block mx-0.5">·</span>
          <span className="whitespace-nowrap">16 May</span>
        </ListTile.Subtitle>
        <ListTile.Tailing className={className.tailing}>
          <Avatar.Icon
            icon={false ? BsCheckCircleFill : BsCheckCircle}
            size={16}
            className="text-[#bcc0c4]"
          />
        </ListTile.Tailing>
      </ListTile>
    </li>
  );
}
