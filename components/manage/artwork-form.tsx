"use client";

import { FormEvent, useEffect, useState } from "react";
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

const DEFAULT_COLORS = ["#D8C7A8", "#46513D", "#B76E4A"];

export default function ArtworkForm({
  artwork,
  onCreated,
  onUpdated,
  onCancel,
}: ArtworkFormProps) {
  const isEditing = Boolean(artwork);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
const [year, setYear] = useState(
  new Date().getFullYear().toString(),
);  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [colors, setColors] = useState<string[]>(DEFAULT_COLORS);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!artwork) {
      setTitle("");
      setDescription("");
      setYear(new Date().getFullYear().toString());
      setCategory("");
      setImage("");
      setColors(DEFAULT_COLORS);
      setSuccess("");
      setError("");
      return;
    }

    setTitle(artwork.title);
    setDescription(artwork.description);
    setYear(artwork.year.toString());
    setCategory(artwork.category);
    setImage(artwork.image);
    setColors(artwork.colors?.length ? artwork.colors : DEFAULT_COLORS);

    setSuccess("");
    setError("");
  }, [artwork]);

  function updateColor(index: number, color: string) {
    setColors((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? color : item)),
    );
  }

  function addColor() {
    if (colors.length >= 5) return;

    setColors((current) => [...current, "#C4B5A5"]);
  }

  function removeColor(index: number) {
    if (colors.length <= 1) return;

    setColors((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setYear(new Date().getFullYear().toString());
    setCategory("");
    setImage("");
    setColors(DEFAULT_COLORS);
  }

  function isValidUrl(value: string) {
    try {
      const url = new URL(value);

      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const cleanDate = year.trim();
    const cleanCategory = category.trim();
    const cleanImage = image.trim();

    if (!cleanTitle) {
      setError("أدخل عنوان العمل");
      return;
    }

    if (!cleanDescription) {
      setError("أدخل وصف العمل");
      return;
    }

    if (!cleanDate) {
      setError("أدخل السنة");
      return;
    }

    if (!cleanCategory) {
      setError("أدخل التصنيف");
      return;
    }

    if (!cleanImage) {
      setError("أدخل رابط الصورة");
      return;
    }

    if (!isValidUrl(cleanImage)) {
      setError("أدخل رابط صورة صحيح يبدأ بـ https://");
      return;
    }

    if (colors.length === 0) {
      setError("أضف لونًا واحدًا على الأقل");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/manage/artworks", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: isEditing ? "update" : "create",
          id: artwork?.id,
          title: title.trim(),
          description: description.trim(),
          year: Number(year),
          category: category.trim(),
          image: image.trim(),
          colors,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ?? (isEditing ? "تعذر تعديل العمل" : "تعذر إضافة العمل"),
        );
        return;
      }

      setSuccess(isEditing ? "تم تعديل العمل بنجاح" : "تمت إضافة العمل بنجاح");

      if (isEditing) {
        onUpdated?.();
      } else {
        resetForm();
        onCreated?.();
      }
    } catch {
      setError("تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-w-0 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.04)] sm:p-5 md:p-7"
      >
        <div className="mb-7 sm:mb-8">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="mb-5 flex items-center gap-2 text-xs text-black/35 transition-colors hover:text-black/70"
            >
              <ArrowRight className="size-3.5" />
              العودة إلى المكتبة
            </button>
          ) : null}

          <div className="flex items-center gap-2 text-black/30">
            <div className="flex size-8 items-center justify-center rounded-full bg-black/[0.04]">
              {isEditing ? (
                <CheckCircle2 className="size-3.5" />
              ) : (
                <Plus className="size-3.5" />
              )}
            </div>

            <p className="text-xs font-medium tracking-[0.2em]">
              {isEditing ? "تعديل العمل" : "عمل جديد"}
            </p>
          </div>

          <h1 className="mt-4 text-2xl font-light tracking-tight sm:text-3xl">
            {isEditing ? "تعديل العمل الفني" : "إضافة عمل فني"}
          </h1>

          <p className="mt-2 max-w-lg text-sm leading-7 text-black/40">
            {isEditing
              ? "عدّل المعلومات ثم احفظ التغييرات."
              : "أدخل المعلومات الأساسية للعمل ثم أضفه إلى المعرض."}
          </p>
        </div>

        <div className="space-y-5">
          <Field label="العنوان">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="مثال: الحديقة المفقودة"
              className={inputClassName}
            />
          </Field>

          <Field label="الوصف">
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="اكتب وصفًا بسيطًا للعمل..."
              rows={4}
              className={`${inputClassName} min-h-28 resize-y py-3`}
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="السنة">
              <input
                value={year}
                onChange={(event) => setYear(event.target.value)}
                placeholder="2026"
                inputMode="numeric"
                className={inputClassName}
              />
            </Field>

            <Field label="التصنيف">
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="رسم رقمي"
                className={inputClassName}
              />
            </Field>
          </div>

          <Field label="رابط الصورة">
            <input
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://res.cloudinary.com/..."
              dir="ltr"
              className={inputClassName}
            />

            <p className="mt-2 text-xs leading-6 text-black/35">
              الصق رابط الصورة المباشر هنا.
            </p>
          </Field>

          {/* Colors */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-black/60">
                <Palette className="size-4 text-black/35" />
                ألوان العمل
              </label>

              <span className="text-xs text-black/30">{colors.length}/5</span>
            </div>

            <div className="rounded-xl border border-black/10 bg-[#faf9f6] p-3 sm:p-4">
              <div className="flex flex-wrap gap-2.5">
                {colors.map((color, index) => (
                  <div
                    key={`${color}-${index}`}
                    className="group flex items-center gap-2 rounded-full border border-black/10 bg-white p-1.5 pr-2 shadow-sm"
                  >
                    <label
                      className="relative block size-9 cursor-pointer overflow-hidden rounded-full"
                      style={{
                        backgroundColor: color,
                      }}
                    >
                      <input
                        type="color"
                        value={color}
                        onChange={(event) =>
                          updateColor(index, event.target.value)
                        }
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </label>

                    <span className="pr-1 text-[10px] uppercase tracking-wide text-black/40">
                      {color}
                    </span>

                    {colors.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className="flex size-6 items-center justify-center rounded-full text-black/25 transition-colors hover:bg-black/5 hover:text-black/60"
                      >
                        <X className="size-3" />
                      </button>
                    ) : null}
                  </div>
                ))}

                {colors.length < 5 ? (
                  <button
                    type="button"
                    onClick={addColor}
                    className="flex h-12 items-center gap-2 rounded-full border border-dashed border-black/15 px-4 text-xs text-black/40 transition-colors hover:border-black/30 hover:text-black/70"
                  >
                    <Plus className="size-3.5" />
                    إضافة لون
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
            <CheckCircle2 className="size-4 shrink-0" />
            {success}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="order-2 h-12 rounded-xl border border-black/10 px-5 text-sm text-black/50 transition-colors hover:bg-black/[0.03] sm:order-1"
            >
              إلغاء
            </button>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="order-1 flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#181816] px-4 text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 sm:order-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                {isEditing ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  <Plus className="size-4" />
                )}
                {isEditing ? "حفظ التعديلات" : "إضافة العمل"}
              </>
            )}
          </button>
        </div>
      </motion.form>

      {/* Preview */}
      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-w-0 lg:sticky lg:top-8 lg:self-start"
      >
        <p className="mb-3 text-xs font-medium tracking-[0.2em] text-black/30">
          معاينة
        </p>

        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
          <div className="relative aspect-[4/3] bg-[#eeece7]">
            {image ? (
              <img
                src={image}
                alt={title || "معاينة العمل"}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-black/25">
                  <ImagePlus className="mx-auto mb-3 size-7" />

                  <p className="text-xs">الصق رابط الصورة لرؤية المعاينة</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-black/40">
                {category || "التصنيف"}
              </span>

              <span className="text-xs text-black/30">{year || "2026"}</span>
            </div>

            <h2 className="mt-4 text-2xl font-light">
              {title || "عنوان العمل"}
            </h2>

            <p className="mt-3 text-sm leading-7 text-black/45">
              {description || "سيظهر وصف العمل هنا."}
            </p>

            <div className="mt-5 flex gap-1.5">
              {colors.map((color, index) => (
                <span
                  key={`${color}-${index}`}
                  className="size-5 rounded-full border border-black/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
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
      <label className="mb-2 block text-sm text-black/60">{label}</label>

      {children}
    </div>
  );
}

const inputClassName =
  "min-h-12 w-full rounded-xl border border-black/10 bg-[#faf9f6] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/20 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]";
