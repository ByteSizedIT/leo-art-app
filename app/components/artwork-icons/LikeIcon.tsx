"use client";

import { useReducer, useEffect } from "react";

import { firestoreDB } from "../../../firebase/firebase-config";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

import { ArtWorkDownload } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeState {
  totalLikes: number;
  liked: boolean;
}

interface Action {
  type: string;
  payload: number;
}

function likeReducer(prevLikeState: LikeState, action: Action) {
  switch (action.type) {
    case "firebaseUpdate":
      return { ...prevLikeState, totalLikes: action.payload };
    case "increment":
      return {
        ...prevLikeState,
        liked: true,
        totalLikes: prevLikeState.totalLikes + 1,
      };
    case "decrement":
      return {
        ...prevLikeState,
        liked: false,
        totalLikes:
          prevLikeState.totalLikes > 0 ? prevLikeState.totalLikes - 1 : 0,
      };
    default:
      return prevLikeState;
  }
}

const LikeIcon = ({ artWork }: { artWork: ArtWorkDownload }) => {
  const initialLikeState = {
    totalLikes: artWork.totalLikes || 0,
    liked:
      // nb server an error when NextJS runs a server render b4 the client render ... https://developer.school/snippets/react/localstorage-is-not-defined-nextjs
      // -  https://stackoverflow.com/questions/72829305/prop-classname-did-not-match-server-and-client ... see import of LikeIcon clinet in atwork/[slug]/page.tsx
      localStorage?.getItem(`${artWork.id} liked`) === "true",
  };

  const [likeState, likeDispatch] = useReducer(likeReducer, initialLikeState);

  // listen for firebase likes
  useEffect(() => {
    console.log("useEffect re running");
    const unsubscribe = onSnapshot(
      doc(firestoreDB, "artworks", artWork.id),
      async (doc) => {
        console.log("Current data: ", doc.data());
        const document = doc.data();
        likeDispatch({
          type: "firebaseUpdate",
          payload: document?.totalLikes,
        });
      }
    );
    return () => {
      console.log("useEffect unsubscribing");
      unsubscribe();
    };
  }, [artWork.id]);

  // update firebase likes
  useEffect(() => {
    if (likeState && artWork.id) {
      const artWorkRef = doc(firestoreDB, "artworks", artWork.id);
      setDoc(artWorkRef, { totalLikes: likeState.totalLikes }, { merge: true });
    }
  }, [likeState, artWork.id]);

  useEffect(() => {
    console.log({ likeState });
  }, [likeState]);

  function handleLike() {
    if (!likeState.liked) {
      localStorage.setItem(`${artWork.id} liked`, "true");
      console.log("local", localStorage.getItem(`${artWork.id} liked`));
      likeDispatch({ type: "increment", payload: 0 });
    } else {
      localStorage.setItem(`${artWork.id} liked`, "false");
      console.log("local", localStorage.getItem(`${artWork.id} liked`));
      likeDispatch({ type: "decrement", payload: 0 });
    }
  }

  return (
    <button
      className="icon-button"
      // border-solid border-2 rounded-lg outline-none hover:outline-gray-500 m-6 p-2
      onClick={handleLike}
    >
      <AiOutlineHeart
        className={`${
          likeState.liked ? "hidden" : "inline-block animate-ping"
        }`}
      />

      <AiFillHeart
        className={`${
          likeState.liked ? "inline-block " : "hidden "
        } text-pink-500 scale-150 `}
      />

      <p className="pl-2">{`${likeState.totalLikes || 0} ${
        likeState.totalLikes === 1 ? "like" : "likes"
      }`}</p>
    </button>
  );
};
export default LikeIcon;
