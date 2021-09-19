import React, { useEffect, useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";
import Friend from "./Friend";
import "./styles.css";

export default function App() {
  const [friendName, setFriendName] = useState("");
  const [display, setDisplay] = useState("none");
  const [friendList, setFriendList] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [deleteFriendName, setDeleteFriendName] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const deleteFriendConfirmName = (name) => {
    setDeleteFriendName(name);
  };

  const setSearchName = (e) => {
    setFriendName(e.target.value);
  };
  const setNewFriendName = (e) => {
    setNewFriend(e.target.value);
  };
  const openModal = () => {
    setDisplay("block");
  };
  const closeModal = () => {
    setDisplay("none");
  };

  const sortFriends = () => {
    var list = [...friendList];
    list.sort(function (x, y) {
      return x.favorite === y.favorite ? 0 : x.favorite ? -1 : 1;
    });
    setFriendList(list);
  };

  const deleteFriend = () => {
    var list = [...friendList];
    list.splice(
      list.findIndex((item) => item.name === deleteFriendName),
      1
    );
    setFriendList(list);
    localStorage.setItem("friendList", JSON.stringify(list));
    setDisplay("none");
  };

  const favoriteFriend = (name) => {
    var list = [...friendList];
    list[list.findIndex((item) => item.name === name)].favorite =
      !list[list.findIndex((item) => item.name === name)].favorite;
    setFriendList(list);
    localStorage.setItem("friendList", JSON.stringify(list));
  };

  const addFriend = (e) => {
    if (e.key === "Enter") {
      var list = friendList ? [...friendList] : [];
      var newObj = {
        name: newFriend,
        favorite: false,
      };

      if (list.filter((item) => item.name === newObj.name).length === 0) {
        list.push(newObj);
        setFriendList(list);
        setNewFriend("");
        localStorage.setItem("friendList", JSON.stringify(list));
      } else {
        alert("Friend Already Exists");
      }
    }
  };

  useEffect(() => {
    setFriendList(JSON.parse(localStorage.getItem("friendList")));
  }, []);

  const allFriends = friendList
    ? friendList.slice(pageNumber, pageNumber + 4)
    : [];

  return (
    <React.Fragment>
      <div className="App">
        <div>
          <div className="topHeader">
            <p className="topHeaderTag">Friends List</p>
          </div>
          <input
            type="text"
            onChange={setSearchName}
            value={friendName}
            placeholder="Search your friend's name"
          ></input>
          {allFriends
            .filter((item) => item.name.includes(friendName))
            .map((friend) => {
              return (
                <Friend
                  name={friend.name}
                  fav={friend.favorite}
                  favoriteFriend={favoriteFriend}
                  openModal={openModal}
                  deleteFriendConfirmName={deleteFriendConfirmName}
                />
              );
            })}
        </div>
        <input
          type="text"
          onChange={setNewFriendName}
          onKeyUp={addFriend}
          value={newFriend}
          placeholder="Add your friend's name"
        ></input>
        <div className="allButtons">
          <button
            disabled={pageNumber === 0}
            style={{
              backgroundColor: !pageNumber ? "gray" : null,
              cursor: !pageNumber ? "no-drop" : null,
            }}
            onClick={() => {
              setPageNumber(pageNumber - 4);
            }}
          >
            Previous Page
          </button>
          <button
            disabled={allFriends.length < 4 || friendList.length === 4}
            style={{
              backgroundColor:
                allFriends.length < 4 || friendList.length === 4
                  ? "gray"
                  : null,
              cursor:
                allFriends.length < 4 || friendList.length === 4
                  ? "no-drop"
                  : null,
            }}
            onClick={() => {
              setPageNumber(pageNumber + 4);
            }}
          >
            Next Page
          </button>
          <button
            onClick={() => {
              sortFriends();
            }}
          >
            Sort
          </button>
        </div>
      </div>
      <DeleteConfirmModal
        display={display}
        closeModal={closeModal}
        deleteFriend={deleteFriend}
      />
    </React.Fragment>
  );
}
