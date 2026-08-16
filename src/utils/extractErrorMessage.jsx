export const extractErrorMessage = (err, genericMessage) => {
  const data = err.response?.data;
      const message =
        data?.message ??
        data?.violations?.[0]?.message ?? genericMessage;
        return message;
}