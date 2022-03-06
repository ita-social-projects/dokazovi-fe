import axios from 'axios';

const baseUrl =
  'https://dokazovi-be-release.herokuapp.com:443/api/post/latest-by-expert?expert=';

export const fetchExpertMaterials = async (
  id: number,
): Promise<Record<string, unknown> | undefined> => {
  try {
    const response = await axios.get(`${baseUrl}${id}`);
    const posts = await response.data.content;
    const postsIds = await posts.map((post) => post.id);

    return { posts, postsIds };
  } catch (error) {
    console.error(error);
  }
  return undefined;
};
