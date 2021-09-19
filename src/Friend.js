import "./Friend.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar as favorite } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export default function Friend(props) {
  return (
    <div className="friend">
      <div className="friend_name_div">
        <p className="friendName">{props.name}</p>
        <p>is your friend</p>
      </div>
      <div className="friend_fav_delete">
        <div className="friend_fav_delete_icon">
          {props.fav ? (
            <FontAwesomeIcon
              icon={favorite}
              color="orange"
              onClick={() => {
                props.favoriteFriend(props.name);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faStar}
              color="orange"
              onClick={() => {
                props.favoriteFriend(props.name);
              }}
            />
          )}
        </div>
        <div className="friend_fav_delete_icon">
          <FontAwesomeIcon
            onClick={() => {
              props.openModal();
              props.deleteFriendConfirmName(props.name);
            }}
            icon={faTrash}
            color="#F76363"
          />
        </div>
      </div>
    </div>
  );
}
