import * as postService from "../services/post";

export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get posts controller" + error,
    });
  }
};

export const getPostsLimit = async (req, res) => {
  const { page, priceNumber, acreageNumber, ...query } = req.query;
  try {
    const response = await postService.getPostsLimitService(page, query, {
      priceNumber,
      acreageNumber,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get posts limit controller" + error,
    });
  }
};

export const createNewPost = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, acreageNumber, label } = req.body;
    const { id } = req.user;
    if (
      !categoryCode ||
      !id ||
      !title ||
      !priceNumber ||
      !acreageNumber ||
      !label
    )
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs" + error,
      });

    const response = await postService.createNewPostService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to create post controller" + error,
    });
  }
};

export const getPostsLimitAdmin = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing id",
      });

    const response = await postService.getPostsLimitAdminService(
      page,
      id,
      query
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get posts limit admin controller" + error,
    });
  }
};

export const updatePostAdmin = async (req, res) => {
  const { postId, attributesId, overviewId, imagesId, ...payload } = req.body;
  const { id } = req.user;
  try {
    if (!postId && !id && !attributesId && !overviewId && !imagesId)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });

    const response = await postService.updatePostAdminService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to update post controller" + error,
    });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.query;
  const { id } = req.user;

  try {
    if (!postId && !id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });

    const response = await postService.deletePost(postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to delete post controller" + error,
    });
  }
};
