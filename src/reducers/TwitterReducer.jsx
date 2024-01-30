const TwitterReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_USERS":
      return { ...state, users: [...action.payload] };

    case "FOLLOW":
      let tempUsers = state.users;
      let { uid, myId, follower, following } = action.payload;

      tempUsers = tempUsers.map((item) => {
        if (item?._id === uid) {
          const arr = [...item?.followers, following];
          item.followers = arr;
          return item;
        }

        if (item?._id === myId) {
          const arr = [...item?.following, follower];
          item.following = arr;
          return item;
        }

        return item;
      });

      return { ...state, users: tempUsers };

    case "UNFOLLOW":
      let tempUsers1 = state.users;
      tempUsers1 = tempUsers1.map((item) => {
        if (item?._id === action.payload.uid) {
          let arr = [
            ...item?.followers?.filter((e) => e?._id !== action.payload.myId),
          ];
          item.followers = arr;
          return item;
        }

        if (item?._id === action.payload.myId) {
          let arr = [
            ...item?.following?.filter((e) => e?._id !== action.payload.uid),
          ];
          item.following = arr;
          return item;
        }

        return item;
      });

      return { ...state, users: tempUsers1 };

    case "REMOVE_USER":
      return { ...state, user: {} };

    case "SET_POSTS":
      return { ...state, posts: [...action.payload] };

    case "ADD_POST":
      var sortedPosts = [...state.posts, action.payload];
      sortedPosts = sortedPosts.sort(
        (a, b) =>
          new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime()
      );
      return { ...state, posts: sortedPosts };

    case "UPDATE_POST":
      var tempPosts = state.posts;
      tempPosts = tempPosts?.map((item) => {
        if (item?._id === action.payload.id) return action.payload.post;
        return item;
      });

      return { ...state, posts: tempPosts };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((item) => item._id !== action.payload),
      };

    case "SET_REPLIES":
      return { ...state, replies: [...action.payload] };

    case "ADD_REPLY":
      var sortedReplies = [...state.replies, action.payload];
      sortedReplies = sortedReplies.sort(
        (a, b) =>
          new Date(b.repliedOn).getTime() - new Date(a.repliedOn).getTime()
      );
      return { ...state, replies: sortedReplies };

    case "ADD_REPLY_TO_REPLY":
      const { rid, reply } = action.payload;
      var tempReplies = state.replies;
      tempReplies = tempReplies.map((item) => {
        if (item._id === rid) {
          reply.replies.sort(
            (a, b) =>
              new Date(b.repliedOn).getTime() - new Date(a.repliedOn).getTime()
          );
          return reply;
        }
        return item;
      });

      return { ...state, replies: tempReplies };

    case "UPDATE_REPLY":
      var newTempReplies = state.replies;
      newTempReplies = newTempReplies.map((item) => {
        if (item._id === action.payload.rid) return action.payload.reply;
        return item;
      });

      return { ...state, replies: newTempReplies };

    case "DELETE_REPLY":
      if (action.payload.parent) {
        var deleteTemp = state.replies;
        deleteTemp = deleteTemp?.map((item) => {
          if (item?._id === action.payload.parent) {
            const arr = item?.replies?.filter(
              (e) => e._id !== action.payload.reply
            );
            return { ...item, replies: arr };
          }
          return item;
        });

        return { ...state, replies: deleteTemp };
      } else
        return {
          ...state,
          replies: state.replies.filter(
            (item) => item?._id !== action.payload.reply
          ),
        };

    case "SET_BOOKMARKS":
      return { ...state, bookmarks: [...action.payload] };

    case "ADD_BOOKMARK":
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };

    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (item) => item._id !== action.payload
        ),
      };

    case "SET_LISTS":
      return { ...state, lists: [...action.payload] };

    case "ADD_LIST":
      return { ...state, lists: [...state.lists, action.payload] };

    case "UPDATE_LIST":
      let tempLists = state.lists;
      tempLists = tempLists?.map((item) => {
        if (item?._id === action.payload.id) return action.payload.list;
        return item;
      });

      return { ...state, lists: tempLists };

    case "SET_PINNED_LISTS":
      return { ...state, pinnedLists: [...action.payload] };

    case "PIN_LIST":
      return { ...state, pinnedLists: [...state.pinnedLists, action.payload] };

    case "UNPIN_LIST":
      return {
        ...state,
        pinnedLists: state.pinnedLists.filter(
          (item) => item._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default TwitterReducer;
