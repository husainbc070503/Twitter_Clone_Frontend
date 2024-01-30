import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NoImage from "../../assets/no-image.jpg";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Chip, Tooltip } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import InputField from "../InputField";
import AddMembers from "./AddMembers";
import { useGlobalContext } from "../../contexts/TwitterContext";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  maxWidth: "96%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const initialState = {
  name: "",
  description: "",
  backgroundImage: "",
};

const NewListForm = ({ fromEdit, list }) => {
  const { users, user, createList, updateList } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const [listDetails, setListDetails] = React.useState(initialState);
  const [members, setMembers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) =>
    setListDetails({ ...listDetails, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error(`Please upload profile pic`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only JPEG or PNG images are accepted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "twitter-clone");
      data.append("cloud", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const finalRes = await res.json();
      if (finalRes) {
        toast.success("Picture Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setListDetails({ ...listDetails, backgroundImage: finalRes.url });
      } else {
        toast.error("Failed to upload picture! Try again later!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    let arr = [...new Set(members)];
    fromEdit
      ? updateList(list?._id, listDetails, arr, setLoading, setOpen)
      : createList(
          listDetails,
          arr,
          setLoading,
          setListDetails,
          initialState,
          setOpen
        );
  };

  React.useEffect(() => {
    setListDetails(list);
    setMembers(list?.members);
  }, [fromEdit, list]);

  return (
    <div>
      {fromEdit ? (
        <Button
          className="Button list-btn mt-3"
          variant="outlined"
          color="secondary"
          onClick={() => setOpen(true)}
        >
          Edit List
        </Button>
      ) : (
        <Tooltip title="New List" placement="bottom">
          <PostAddIcon
            onClick={() => setOpen(true)}
            className="icon"
            sx={{ fontSize: 30 }}
          />
        </Tooltip>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={24} fontWeight="bold" mb={1}>
            {fromEdit ? "Edit" : "Create"} List
          </Typography>
          <div className="list-image mb-3">
            <img
              src={
                listDetails?.backgroundImage
                  ? listDetails?.backgroundImage
                  : NoImage
              }
              alt="image"
            />
            <div className="add-icon">
              <label htmlFor="bg-image">
                <AddPhotoAlternateIcon className="icon text-light" />
              </label>
              <input
                type="file"
                id="bg-image"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="details">
            <InputField
              title="List Name"
              type="text"
              others="name"
              value={listDetails?.name}
              onChange={handleChange}
            />
            <InputField
              title="Description"
              type="text"
              others="description"
              value={listDetails?.description}
              onChange={handleChange}
              multiline={true}
              rows={3}
            />

            {fromEdit && (
              <div className="my-2 mb-3">
                <Typography fontSize={20} fontWeight="bold">
                  Members
                </Typography>
                <div className="members-chip">
                  {members?.map((item, ind) => (
                    <Tooltip title="Remove Member" placement="bottom">
                      <Chip
                        key={ind}
                        label={item?.name}
                        variant="outlined"
                        className="me-1"
                        onDelete={() =>
                          setMembers(
                            members?.filter((e) => e?._id !== item?._id)
                          )
                        }
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}

            <AddMembers
              users={
                fromEdit
                  ? users?.filter(
                      (item) =>
                        !members?.find((e) => e?._id === item?._id) &&
                        item?._id !== user?.user?._id
                    )
                  : users?.filter((item) => item?._id !== user?.user?._id)
              }
              members={members}
              setMembers={setMembers}
            />
          </div>
          <Button
            className="mt-4"
            color="secondary"
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
          >
            {fromEdit ? "Save" : "Create"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default NewListForm;
