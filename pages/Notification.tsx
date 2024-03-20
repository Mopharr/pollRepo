import React, { useState } from "react";
import NotificationData from "@/data/notifications.json";
import Imga from "@/asset/image/leo messi.jpeg";
import LikeIcon from "@/asset/svg/like.svg";
import CommentIcon from "@/asset/svg/FashionIcon.svg";
import MessageIcon from "@/asset/svg/LegacyIcon.svg";
import FollowIcon from "@/asset/svg/follow.svg";
import Image from "next/image";
// import CommentIcon from "@/asset/svg/comment.png";
import { FaRegComment } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import styles from "@/styles/Notification.module.css";
import { notifications } from "@/data/notifications.react";

// Define interfaces to match the new JSON structure
interface User {
  id: string;
  name: string;
  profile_picture: string;
  profile_url: string;
}

interface Post {
  id: string;
  content: string;
  url: string;
}

interface Reply {
  id: string;
  content: string;
  url: string;
}

interface Comment {
  id: string;
  content: string;
  url: string;
}

interface MessageDetails {
  id: string;
  content: string;
  url: string;
}

interface Event {
  id: string;
  name: string;
  url: string;
}

interface Group {
  id: string;
  name: string;
  url: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  url: string;
}

// Extend the INotification interface
interface INotification {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  user?: User; // Making user optional to reflect potential data structure
  post?: Post;
  reply?: Reply;
  comment?: Comment;
  message_details?: MessageDetails;
  event?: Event;
  group?: Group;
  achievement?: Achievement;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<INotification[]>(
    NotificationData.notifications
  );

  const renderIcon = (notification: INotification) => {
    switch (notification.type) {
      case "follow":
        return <FollowIcon />;
      case "like":
        return <LikeIcon />;
      case "comment":
        return <CommentIcon />;
      case "message":
        return <MessageIcon />;
      // case "event_invitation":
      //   return <Icon name="event" />;
      // case "group_join_request":
      //   return <Icon name="group" />;
      // case "achievement":
      //   return <Icon name="achievement" />;
      default:
        return null;
    }
  };

  const renderDetails = (notification: INotification) => {
    switch (notification.type) {
      case "like":
      case "comment":
      case "post_share":
        return (
          <div>
            {notification.post && (
              <>
                {/* <a href={notification.post.url}>View post</a> */}
                <p>{notification.post.content}</p>
              </>
            )}
            {notification.comment && (
              <p>Comment: {notification.comment.content}</p>
            )}
          </div>
        );
      case "message":
        return (
          notification.message_details && (
            <div>
              {/* <a href={notification.message_details.url}>View message</a> */}
              <p>Message: {notification.message_details.content}</p>
            </div>
          )
        );
      case "event_invitation":
        return (
          notification.event && (
            <div>
              {/* <a href={notification.event.url}>View event</a> */}
              <p>Event: {notification.event.name}</p>
            </div>
          )
        );
      case "group_join_request":
        return (
          notification.group && (
            <div>
              {/* <a href={notification.group.url}>View group</a> */}
              <p>Group: {notification.group.name}</p>
            </div>
          )
        );
      case "achievement":
        return (
          notification.achievement && (
            <div>
              <a href={notification.achievement.url}>View achievement</a>
              <p>Achievement: {notification.achievement.name}</p>
            </div>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          // style={{ marginBottom: "10px" }}
          className={styles.notifacationWrapper}
        >
          {notification.user ? (
            <div className={styles.notificationHeader}>
              <div>{renderIcon(notification)}</div>
              <div>
                <Image
                  // src={notification.user.profile_picture}
                  src={Imga}
                  alt={notification.user.name}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
                <p className={styles.message}>
                  {notification.message.split("{user}")[0]}
                  <span className={styles.userName}>
                    {notification.user.name}
                  </span>
                  {notification.message.split("{user}")[1]}
                </p>
                <p className={styles.message}> {renderDetails(notification)}</p>
              </div>
            </div>
          ) : (
            <p>Notification details not available.</p>
          )}
        </div>
      ))}
    </div>
  );
};

// Dummy Icon component, replace it with your actual icon component
const Icon = ({ name }: { name: string }) => {
  // Dummy implementation, replace with actual icons or icon library usage
  return <div>{name.toUpperCase()} ICON</div>;
};

export default Notification;
