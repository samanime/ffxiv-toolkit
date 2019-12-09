export default (req, res, next) => {
  const realWrite = res.send.bind(res);
  const realEnd = res.end.bind(res);
  const realSend = res.send.bind(res);

  const chunks = [];

  Object.defineProperty(res, 'body', {
    get: () => Buffer.concat(chunks)
  });

  res.send = (chunk, ...rest) => {
    chunks.push(Buffer.from(chunk));

    realSend(chunk, ...rest);
  };

  res.write = (chunk, ...rest) => {
    chunks.push(Buffer.from(chunk));

    realWrite(chunk, ...rest);
  };

  res.end = (chunk, ...rest) => {
    if (chunk) {
      const buffer = Buffer.from(chunk);

      (!chunks.length || !buffer.equals(chunks[chunks.length - 1])) && chunks.push(buffer);
    }

    realEnd(chunk, ...rest);
  };

  next();
};