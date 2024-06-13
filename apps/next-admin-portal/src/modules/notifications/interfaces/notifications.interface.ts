export type SendNotificationDto = {
  title: string;
  content: string;
  topic?: string;
  image?: string;
  channelId?: string;
  sound?: boolean;
};
