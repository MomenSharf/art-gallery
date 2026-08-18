"use client";

import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Palette,
  Plus,
  X,
} from "lucide-react";

import type { Artwork } from "@/types/artwork";

interface ArtworkFormProps {
  artwork?: Artwork | null;
  onCreated?: () => void;
  onUpdated?: () => void;
  onCancel?: () => void;
}

interface FormState {
  title: string;
  description: string;
  year: string;
  category: string;
  image: string;
  colors: string[];
}

const DEFAULT_COLORS = ["#D8C7A8", "#46513D", "#B76E4A"];
const MAX_COLORS = 5;

function createForm(artwork?: Artwork | null): FormState {
  return {
    title: artwork?.title ?? "",
    description: artwork?.description ?? "",
    year: artwork?.year?.toString() ?? new Date().getFullYear().toString(),
    category: artwork?.category ?? "",
    image: artwork?.image ?? "",
    colors: artwork?.colors?.length
      ? [...artwork.colors]
      : [...DEFAULT_COLORS],
  };
}

export default function ArtworkForm({
  artwork,
  onCreated,
  onUpdated,
  onCancel,
}: ArtworkFormProps) {
  const editing = !!artwork;

  const [form, setForm] = useState(() => createForm(artwork));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  function setField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setMessage(null);
  }

  function setColor(index: number, color: string) {
    setForm((current) => ({
      ...current,
      colors: current.colors.map((value, i) =>
        i === index ? color : value,
      ),
    }));
  }

  function addColor() {
    setForm((current) =>
      current.colors.length >= MAX_COLORS
        ? current
        : {
            ...current,
            colors: [...current.colors, "#C4B5A5"],
          },
    );
  }

  function removeColor(index: number) {
    setForm((current) =>
      current.colors.length <= 1
        ? current
        : {
            ...current,
            colors: current.colors.filter((_, i) => i !== index),
          },
    );
  }

  function validate() {
    const title = form.title.trim();
    const description = form.description.trim();
    const year = form.year.trim();
    const category = form.category.trim();
    const image = form.image.trim();

    if (!title) return "أدخل عنوان العمل";
    if (!description) return "أدخل وصف العمل";
    if (!year) return "أدخل السنة";
    if (!category) return "أدخل التصنيف";
    if (!image) return "أدخل رابط الصورة";

    try {
      const url = new URL(image);

      if (!["http:", "https:"].includes(url.protocol)) {
        return "أدخل رابط صورة صحيح";
      }
    } catch {
      return "أدخل رابط صورة صحيح";
    }

    if (!form.colors.length) {
      return "أضف لونًا واحدًا على الأقل";
    }

    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validate();

    if (validationError) {
      setMessage({
        type: "error",
        text: validationError,
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/manage/artworks", {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: editing ? "update" : "create",
          id: artwork?.id,
          title: form.title.trim(),
          description: form.description.trim(),
          year: Number(form.year),
          category: form.category.trim(),
          image: form.image.trim(),
          colors: form.colors,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            (editing
              ? "تعذر تعديل العمل"
              : "تعذر إضافة العمل"),
        );
      }

      setMessage({
        type: "success",
        text: editing
          ? "تم تعديل العمل بنجاح"
          : "تمت إضافة العمل بنجاح",
      });

      if (editing) {
        onUpdated?.();
      } else {
        setForm(createForm());
        onCreated?.();
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "تعذر الاتصال بالخادم",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-w-0 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.04)] sm:p-6 md:p-7"
      >
        <header className="mb-7">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="mb-5 flex items-center gap-2 text-xs text-black/35 transition hover:text-black/70"
            >
              <ArrowRight className="size-3.5" />
              العودة إلى المكتبة
            </button>
          )}

          <div className="flex items-center gap-2 text-black/30">
            <div className="flex size-8 items-center justify-center rounded-full bg-black/[0.04]">
              {editing ? (
                <CheckCircle2 className="size-3.5" />
              ) : (
                <Plus className="size-3.5" />
              )}
            </div>

            <span className="text-xs font-medium tracking-[0.2em]">
              {editing ? "تعديل العمل" : "عمل جديد"}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-light tracking-tight sm:text-3xl">
            {editing ? "تعديل العمل الفني" : "إضافة عمل فني"}
          </h1>

          <p className="mt-2 text-sm leading-7 text-black/40">
            {editing
              ? "عدّل المعلومات ثم احفظ التغييرات."
              : "أدخل المعلومات الأساسية للعمل ثم أضفه إلى المعرض."}
          </p>
        </header>

        <div className="space-y-5">
          <Field label="العنوان">
            <input
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="مثال: الحديقة المفقودة"
              className={inputClassName}
            />
          </Field>

          <Field label="الوصف">
            <textarea
              value={form.description}
              onChange={(e) =>
                setField("description", e.target.value)
              }
              placeholder="اكتب وصفًا بسيطًا للعمل..."
              rows={4}
              className={`${inputClassName} min-h-28 resize-y`}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="السنة">
              <input
                value={form.year}
                onChange={(e) => setField("year", e.target.value)}
                placeholder="2026"
                inputMode="numeric"
                className={inputClassName}
              />
            </Field>

            <Field label="التصنيف">
              <input
                value={form.category}
                onChange={(e) =>
                  setField("category", e.target.value)
                }
                placeholder="رسم رقمي"
                className={inputClassName}
              />
            </Field>
          </div>

          <Field label="رابط الصورة">
            <input
              type="url"
              value={form.image}
              onChange={(e) => setField("image", e.target.value)}
              placeholder="https://res.cloudinary.com/..."
              dir="ltr"
              className={inputClassName}
            />

            <p className="mt-2 text-xs text-black/35">
              الصق رابط الصورة المباشر هنا.
            </p>
          </Field>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-black/60">
                <Palette className="size-4 text-black/35" />
                ألوان العمل
              </label>

              <span className="text-xs text-black/30">
                {form.colors.length}/{MAX_COLORS}
              </span>
            </div>

            <div className="rounded-xl border border-black/10 bg-[#faf9f6] p-3 sm:p-4">
              <div className="flex flex-wrap gap-2.5">
                {form.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full border border-black/10 bg-white p-1.5 pr-2 shadow-sm"
                  >
                    <label
                      className="relative size-9 cursor-pointer overflow-hidden rounded-full"
                      style={{ backgroundColor: color }}
                    >
                      <input
                        type="color"
                        value={color}
                        onChange={(e) =>
                          setColor(index, e.target.value)
                        }
                        className="absolute inset-0 size-full cursor-pointer opacity-0"
                      />
                    </label>

                    <span className="pr-1 text-[10px] uppercase text-black/40">
                      {color}
                    </span>

                    {form.colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className="flex size-6 items-center justify-center rounded-full text-black/25 transition hover:bg-black/5 hover:text-black/60"
                      >
                        <X className="size-3" />
                      </button>
                    )}
                  </div>
                ))}

                {form.colors.length < MAX_COLORS && (
                  <button
                    type="button"
                    onClick={addColor}
                    className="flex h-12 items-center gap-2 rounded-full border border-dashed border-black/15 px-4 text-xs text-black/40 transition hover:border-black/30 hover:text-black/70"
                  >
                    <Plus className="size-3.5" />
                    إضافة لون
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`mt-5 flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
              message.type === "error"
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {message.type === "success" && (
              <CheckCircle2 className="size-4 shrink-0" />
            )}

            {message.text}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="h-12 rounded-xl border border-black/10 px-5 text-sm text-black/50 transition hover:bg-black/[0.03]"
            >
              إلغاء
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#181816] px-4 text-sm text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                {editing ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  <Plus className="size-4" />
                )}

                {editing ? "حفظ التعديلات" : "إضافة العمل"}
              </>
            )}
          </button>
        </div>
      </motion.form>

      <Preview form={form} />
    </div>
  );
}

function Preview({ form }: { form: FormState }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-w-0 lg:sticky lg:top-8 lg:self-start"
    >
      <p className="mb-3 text-xs font-medium tracking-[0.2em] text-black/30">
        معاينة
      </p>

      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        <div className="relative aspect-[4/3] bg-[#eeece7]">
          {form.image ? (
            <img
              src={form.image}
              alt={form.title || "معاينة العمل"}
              className="absolute inset-0 size-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-black/25">
                <ImagePlus className="mx-auto mb-3 size-7" />
                <p className="text-xs">
                  الصق رابط الصورة لرؤية المعاينة
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-black/40">
              {form.category || "التصنيف"}
            </span>

            <span className="text-xs text-black/30">
              {form.year || "2026"}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-light">
            {form.title || "عنوان العمل"}
          </h2>

          <p className="mt-3 text-sm leading-7 text-black/45">
            {form.description || "سيظهر وصف العمل هنا."}
          </p>

          <div className="mt-5 flex gap-1.5">
            {form.colors.map((color, index) => (
              <span
                key={index}
                className="size-5 rounded-full border border-black/10"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-black/60">
        {label}
      </label>

      {children}
    </div>
  );
}

const inputClassName =
  "min-h-12 w-full rounded-xl border border-black/10 bg-[#faf9f6] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/20 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]";