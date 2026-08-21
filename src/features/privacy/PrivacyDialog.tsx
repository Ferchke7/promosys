"use client";

import { useRef } from "react";
import { X } from "lucide-react";

export function PrivacyDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" onClick={() => dialogRef.current?.showModal()} className="text-sm text-slate-500 transition hover:text-[#071426]">Политика конфиденциальности</button>
      <dialog ref={dialogRef} className="m-auto w-[min(92vw,640px)] rounded-[28px] bg-white p-0 text-[#071426] shadow-2xl backdrop:bg-[#071426]/70 backdrop:backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5"><h2 className="text-xl font-bold">Политика конфиденциальности</h2><button type="button" onClick={() => dialogRef.current?.close()} aria-label="Закрыть" className="grid size-9 place-items-center rounded-full bg-slate-100"><X className="size-4" /></button></div>
        <div className="grid gap-4 p-6 text-sm leading-6 text-slate-600"><p>PROMSYS использует данные формы только для ответа на ваш запрос и организации консультации.</p><p>Имя, компания и номер телефона передаются в Telegram только после нажатия кнопки отправки. Сайт не хранит эти данные в собственной базе.</p><p>До публикации юридическая редакция политики должна быть дополнена реквизитами оператора данных и утверждена владельцем сайта.</p></div>
      </dialog>
    </>
  );
}
