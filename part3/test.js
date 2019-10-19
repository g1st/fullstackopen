exports.decode = string => {
  try {
    const decoded = hashids.decode(string);
    return decoded[0];
  } catch (e) {
    return res.status(403).json({ error: 'DECODE_ERROR' });
  }
};
