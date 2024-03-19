import { axiosPrivate, axiosPublic } from "../library/axios";
import { AxiosResponse } from "axios";

export async function handlePublicRequest<T>(
  type: "post" | "get" | "put" | "delete" | "patch",
  url: string,
  payload?: T
) {
  const res = (
    type === "post"
      ? await axiosPublic.post(url, payload)
      : type === "put"
      ? await axiosPublic.put(url, payload)
      : type === "delete"
      ? await axiosPublic.delete(url)
      : type === "patch"
      ? await axiosPublic.patch(url, payload)
      : await axiosPublic.get(url)
  ) as AxiosResponse;

  if (res.status !== 201 && res.status !== 200) {
    throw res.data;
  }

  const data = res.data as unknown;
  return data;
}

export async function handlePrivateRequest<T>(
  type: "post" | "get" | "put" | "delete" | "patch",
  url: string,
  payload?: T
) {
  const res = (
    type === "post"
      ? await axiosPrivate.post(url, payload)
      : type === "put"
      ? await axiosPrivate.put(url, payload)
      : type === "delete"
      ? await axiosPrivate.delete(url)
      : type === "patch"
      ? await axiosPrivate.patch(url, payload)
      : await axiosPrivate.get(url)
  ) as AxiosResponse;

  if (res.status !== 201 && res.status !== 200) {
    throw res.data;
  }

  const data = res.data as unknown;
  return data;
}
