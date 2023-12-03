import fetchData from "@/helpers/fetchData";

const registerService = async (data: any) => {
  try {
    const res = await fetchData.mutationData({
      url: "/api/register",
      method: "POST",
      body: data,
    });
    return res;
  } catch (error) {
    return error;
  }
};
export default registerService;
