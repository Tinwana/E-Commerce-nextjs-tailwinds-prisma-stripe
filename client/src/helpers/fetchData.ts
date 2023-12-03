type mutationType = {
  url: string;
  method: "POST" | "PUT" | "DELETE" | "PATCH";
  body: any;
  headers?: Headers;
};
interface queryType {
  url: string;
  headers?: Headers;
}
class fetchData {
  private baseUrl;
  constructor(BASE_URL = "http://localhost:3000") {
    this.baseUrl = BASE_URL;
  }
  async queryData(query: queryType) {
    try {
      const res = await fetch(this.baseUrl + query.url, {
        cache: "force-cache",
        method: "GET",
        headers: !query.headers
          ? { "Content-Type": "application/json" }
          : query.headers,
        next: { revalidate: 60 },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async mutationData(mutation: mutationType) {
    try {
      const res = await fetch(this.baseUrl + mutation.url, {
        cache: "no-store",
        method: mutation.method,
        headers: !mutation.headers
          ? { "Content-Type": "application/json" }
          : mutation.headers,
        body: JSON.stringify(mutation.body),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new fetchData();
