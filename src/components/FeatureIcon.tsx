import { Calendar, Video, Pill, MessageSquare, Bot, Shield, User, Lock, LucideProps } from "lucide-react";
import type { IconKey } from "@/data/mock";

const map = { calendar: Calendar, video: Video, pill: Pill, message: MessageSquare, bot: Bot, shield: Shield, user: User, lock: Lock };

const FeatureIcon = ({ name, ...props }: { name: IconKey } & LucideProps) => {
  const Icon = map[name];
  return <Icon {...props} />;
};

export default FeatureIcon;
