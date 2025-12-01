export enum EStatusEnglish {
  DONE = "done",
  CREATE = "created",
  PENDING = "pending",
}
export enum EStatusRussia {
  DONE = "Выполнен",
  CREATE = "Создан",
  PENDING = "Готовится",
  CANCELLED = "Отменён",
}

export const getOrderStatusInRussianLanguage = (
  statusInEnglish: string
): EStatusRussia => {
  if (statusInEnglish === EStatusEnglish.DONE) return EStatusRussia.DONE;
  else if (statusInEnglish === EStatusEnglish.CREATE)
    return EStatusRussia.CREATE;
  else if (statusInEnglish === EStatusEnglish.PENDING)
    return EStatusRussia.PENDING;
  else return EStatusRussia.CANCELLED;
};
