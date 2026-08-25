"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  AtSign,
  Check,
  Globe,
  // Instagram,
  Mail,
  MapPin,
  Palette,
  Phone,
  Save,
  SquareDotIcon,
  UserRound,
} from "lucide-react";
import { ArtistProfile } from "@/types/artist-profile";
import { updateProfile } from "@/lib/actions/update-profile";



interface ProfileFormProps {
  profile: ArtistProfile | null;
}

interface FormState {
  name: string;
  bio: string;
  phone: string;
  email: string;
  location: string;
  avatar: string;
  website: string;
  instagram: string;
  facebook: string;
  x: string;
  behance: string;
  dribbble: string;
  artStyle: string;
  specialty: string;
  availableForWork: boolean;
}

function createForm(
  profile: ArtistProfile | null
): FormState {
  return {
    name: profile?.name ?? "",
    bio: profile?.bio ?? "",
    phone: profile?.phone ?? "",
    email: profile?.email ?? "",
    location: profile?.location ?? "",
    avatar: profile?.avatar ?? "",
    website: profile?.website ?? "",
    instagram: profile?.instagram ?? "",
    facebook: profile?.facebook ?? "",
    x: profile?.x ?? "",
    behance: profile?.behance ?? "",
    dribbble: profile?.dribbble ?? "",
    artStyle: profile?.artStyle ?? "",
    specialty: profile?.specialty ?? "",
    availableForWork:
      profile?.availableForWork ?? false,
  };
}

export default function ProfileForm({
  profile,
}: ProfileFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(() =>
    createForm(profile)
  );

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  function setField<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setMessage(null);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.name.trim()) {
      setMessage({
        type: "error",
        text: "أدخل اسم الفنان",
      });

      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      await updateProfile({
        ...form,
      });

      setMessage({
        type: "success",
        text: "تم حفظ الملف الشخصي بنجاح",
      });

      router.refresh();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "تعذر حفظ الملف الشخصي",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.04)] sm:p-7"
      >
        {/* Heading */}
        <header className="mb-8">
          <div className="flex size-10 items-center justify-center rounded-xl bg-black/[0.04]">
            <UserRound className="size-4 text-black/50" />
          </div>

          <h1 className="mt-5 text-3xl font-light tracking-tight">
            الملف الشخصي
          </h1>

          <p className="mt-2 max-w-lg text-sm leading-7 text-black/40">
            أضف معلومات الفنان التي ستظهر في صفحة
            المعرض والملف التعريفي.
          </p>
        </header>

        <div className="space-y-8">
          {/* Basic */}
          <Section
            title="المعلومات الأساسية"
            description="المعلومات الرئيسية عن الفنان."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="الاسم">
                <Input
                  value={form.name}
                  onChange={(value) =>
                    setField("name", value)
                  }
                  placeholder="اسم الفنان"
                />
              </Field>

              <Field label="الموقع">
                <Input
                  value={form.location}
                  onChange={(value) =>
                    setField("location", value)
                  }
                  placeholder="القاهرة، مصر"
                  icon={<MapPin />}
                />
              </Field>
            </div>

            <Field label="نبذة">
              <textarea
                value={form.bio}
                onChange={(event) =>
                  setField(
                    "bio",
                    event.target.value
                  )
                }
                placeholder="اكتب نبذة قصيرة عن الفنان..."
                rows={5}
                className={textareaClass}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="أسلوب الرسم">
                <Input
                  value={form.artStyle}
                  onChange={(value) =>
                    setField(
                      "artStyle",
                      value
                    )
                  }
                  placeholder="رسم رقمي"
                  icon={<Palette />}
                />
              </Field>

              <Field label="التخصص">
                <Input
                  value={form.specialty}
                  onChange={(value) =>
                    setField(
                      "specialty",
                      value
                    )
                  }
                  placeholder="بورتريه، طبيعة..."
                />
              </Field>
            </div>
          </Section>

          {/* Contact */}
          <Section
            title="التواصل"
            description="طرق التواصل مع الفنان."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="البريد الإلكتروني">
                <Input
                  value={form.email}
                  onChange={(value) =>
                    setField("email", value)
                  }
                  placeholder="artist@example.com"
                  dir="ltr"
                  icon={<Mail />}
                />
              </Field>

              <Field label="رقم الهاتف">
                <Input
                  value={form.phone}
                  onChange={(value) =>
                    setField("phone", value)
                  }
                  placeholder="+20 ..."
                  dir="ltr"
                  icon={<Phone />}
                />
              </Field>
            </div>

            <Field label="رابط الصورة الشخصية">
              <Input
                value={form.avatar}
                onChange={(value) =>
                  setField("avatar", value)
                }
                placeholder="https://..."
                dir="ltr"
              />
            </Field>
          </Section>

          {/* Social */}
          <Section
            title="حسابات التواصل"
            description="أضف الحسابات التي تريد عرضها."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Instagram">
                <Input
                  value={form.instagram}
                  onChange={(value) =>
                    setField(
                      "instagram",
                      value
                    )
                  }
                  placeholder="@username"
                  dir="ltr"
                  icon={<SquareDotIcon />}
                />
              </Field>

              <Field label="Facebook">
                <Input
                  value={form.facebook}
                  onChange={(value) =>
                    setField(
                      "facebook",
                      value
                    )
                  }
                  placeholder="facebook.com/..."
                  dir="ltr"
                />
              </Field>

              <Field label="X">
                <Input
                  value={form.x}
                  onChange={(value) =>
                    setField("x", value)
                  }
                  placeholder="@username"
                  dir="ltr"
                  icon={<AtSign />}
                />
              </Field>

              <Field label="Behance">
                <Input
                  value={form.behance}
                  onChange={(value) =>
                    setField(
                      "behance",
                      value
                    )
                  }
                  placeholder="behance.net/..."
                  dir="ltr"
                />
              </Field>

              <Field label="Dribbble">
                <Input
                  value={form.dribbble}
                  onChange={(value) =>
                    setField(
                      "dribbble",
                      value
                    )
                  }
                  placeholder="dribbble.com/..."
                  dir="ltr"
                />
              </Field>

              <Field label="الموقع الإلكتروني">
                <Input
                  value={form.website}
                  onChange={(value) =>
                    setField(
                      "website",
                      value
                    )
                  }
                  placeholder="https://..."
                  dir="ltr"
                  icon={<Globe />}
                />
              </Field>
            </div>
          </Section>

          {/* Availability */}
          <Section
            title="الحالة"
            description="هل الفنان متاح لأعمال جديدة؟"
          >
            <button
              type="button"
              onClick={() =>
                setField(
                  "availableForWork",
                  !form.availableForWork
                )
              }
              className="flex w-full items-center justify-between rounded-xl border border-black/10 bg-[#faf9f6] p-4 text-right transition hover:border-black/20"
            >
              <div>
                <p className="text-sm text-black/70">
                  متاح لأعمال جديدة
                </p>

                <p className="mt-1 text-xs text-black/35">
                  يمكن إظهار هذه الحالة في الملف
                  الشخصي.
                </p>
              </div>

              <div
                className={`flex size-6 items-center justify-center rounded-full border transition ${
                  form.availableForWork
                    ? "border-black bg-[#181816] text-white"
                    : "border-black/15 bg-white"
                }`}
              >
                {form.availableForWork && (
                  <Check className="size-3.5" />
                )}
              </div>
            </button>
          </Section>
        </div>

        {message && (
          <div
            className={`mt-6 rounded-xl px-4 py-3 text-sm ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#181816] text-sm text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
        >
          <Save className="size-4" />

          {saving
            ? "جاري الحفظ..."
            : "حفظ الملف الشخصي"}
        </button>
      </motion.form>

      {/* Preview */}
      <ProfilePreview form={form} />
    </div>
  );
}

function ProfilePreview({
  form,
}: {
  form: FormState;
}) {
  const initials =
    form.name.trim().slice(0, 1) || "ف";

  return (
    <motion.aside
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="lg:sticky lg:top-24 lg:self-start"
    >
      <p className="mb-3 text-xs font-medium tracking-[0.2em] text-black/30">
        معاينة
      </p>

      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        <div className="flex flex-col items-center px-6 pb-7 pt-8 text-center">
          <div className="relative size-24 overflow-hidden rounded-full border border-black/10 bg-[#eeece7]">
            {form.avatar ? (
              <img
                src={form.avatar}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-2xl font-light text-black/30">
                {initials}
              </div>
            )}
          </div>

          <h2 className="mt-5 text-2xl font-light">
            {form.name || "اسم الفنان"}
          </h2>

          <p className="mt-2 text-sm text-black/40">
            {form.artStyle || "الفنان"}
          </p>

          {form.location && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-black/35">
              <MapPin className="size-3.5" />
              {form.location}
            </div>
          )}

          <p className="mt-5 text-sm leading-7 text-black/45">
            {form.bio ||
              "ستظهر نبذة الفنان هنا."}
          </p>

          {form.availableForWork && (
            <div className="mt-5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs text-emerald-700">
              متاح لأعمال جديدة
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-sm font-medium">
          {title}
        </h2>

        <p className="mt-1 text-xs text-black/35">
          {description}
        </p>
      </div>

      {children}
    </section>
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

function Input({
  value,
  onChange,
  placeholder,
  icon,
  dir,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/25 [&_svg]:size-4">
          {icon}
        </span>
      )}

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        dir={dir}
        className={`${inputClass} ${
          icon ? "pr-11" : ""
        }`}
      />
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-black/10 bg-[#faf9f6] px-4 text-sm outline-none transition-all placeholder:text-black/20 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]";

const textareaClass =
  "w-full resize-y rounded-xl border border-black/10 bg-[#faf9f6] px-4 py-3 text-sm leading-7 outline-none transition-all placeholder:text-black/20 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]";