const validUkrName = new RegExp('^[а-яА-Я0-9їЇєЄґҐіІ ()"\'\\-\\.,/&№%:@]*$');
const validEnName = new RegExp('^[a-zA-Z0-9 ()"\'\\-\\.,/&№%:@]*$');
const validEmail = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

export const regex = {
  validUkrName,
  validEmail,
  validEnName,
};
