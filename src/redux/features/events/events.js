import { API } from "../../../api";
import handleDecryptData from "../../../utils/handleDecryptData";
import { baseApi } from "../../api/baseApi";

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGroupEvents: builder.query({
      query: (sports) => {
        return {
          url: `${API.groupSportsBook}/${sports}`,
          method: "GET",
          headers: {
            "Cache-Control": "public",
            "max-age": 1,
          },
        };
      },
      transformResponse: (data) => {
        if (data?.ct) {
          return handleDecryptData(JSON.stringify(data));
        } else {
          return data;
        }
      },
    }),
    getAllOddsEvents: builder.query({
      query: (payload) => {
        return {
          url: `${API.eventDetails}/${payload.eventTypeId}/${payload.eventId}`,
          method: "GET",
          headers: {
            "Cache-Control": "public",
            "max-age": 1,
          },
        };
      },
      transformResponse: (data) => {
        if (data?.ct) {
          return handleDecryptData(JSON.stringify(data));
        } else {
          return data;
        }
      },
    }),
    order: builder.mutation({
      query: (payload) => {
        return {
          url: `${API.order}`,
          method: "POST",
          body: payload,
        };
      },
    }),
    getLadder: builder.mutation({
      query: (payload) => {
        return {
          url: `${API.ladder}/${payload.marketId}`,
          method: "POST",
          body: payload.data,
        };
      },
    }),
    editButtonValues: builder.mutation({
      query: (payload) => {
        return {
          url: `${API.buttonValue}`,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useGetAllGroupEventsQuery,
  useGetAllOddsEventsQuery,
  useOrderMutation,
  useGetLadderMutation,
  useEditButtonValuesMutation,
} = eventsApi;
