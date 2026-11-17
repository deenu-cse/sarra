export const MAX_FILE_MB = 5;

const IMAGE_TYPES = 'image/jpeg,image/png,image/webp';

export const FILE_TYPES = {
    image: { accept: IMAGE_TYPES, label: 'JPG, PNG or WEBP' },
    pdf: { accept: 'application/pdf', label: 'PDF' },
    any: { accept: `${IMAGE_TYPES},application/pdf`, label: 'JPG, PNG, WEBP or PDF' },
};

// Job dates are calendar days stored as UTC midnight
export const formatJobDate = (date) => new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});
