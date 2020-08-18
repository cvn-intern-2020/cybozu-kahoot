const redirect = (url) => (window.location.href = url);
const keyToVariants = (key) => {
    const variants = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
    ];
    return variants[Math.floor(key % variants.length)];
};

export { redirect, keyToVariants };
