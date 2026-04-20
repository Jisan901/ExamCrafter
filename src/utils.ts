export const banglaNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export const banglaLetters = ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ', 'ড়', 'ঢ়', 'য়', 'ৎ'];

export function formatNumber(num: number | string, lang: string): string {
  if (lang === 'bn') {
    return num.toString().split('').map(n => /[0-9]/.test(n) ? banglaNumerals[parseInt(n)] : n).join('');
  }
  return num.toString();
}

export function formatListLetter(index: number, lang: string, uppercase: boolean = false): string {
  if (lang === 'bn') {
    return banglaLetters[index % banglaLetters.length];
  }
  return uppercase ? String.fromCharCode(65 + index) : String.fromCharCode(97 + index);
}
