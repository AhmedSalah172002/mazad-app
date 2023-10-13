import baseUrl from '../Api/baseURL';

const useDeleteData = async (url, params) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    try {
        const res = await baseUrl.delete(url, config);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
};

export default useDeleteData;
