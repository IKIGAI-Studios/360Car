export function validateString(str: string): boolean {
    return /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:\s+[a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/.test(str);
}

export function validateNumber(str: string): boolean{
    return /^[1-9][0-9]*$/.test(str);
}

export function validatePhone(str: string): boolean{
    return /^\d{10}$/.test(str);
}

export function validateAlphanumeric(str: string): boolean{
    return /^[a-zA-Z0-9À-ÖØ-öø-ÿ]+(?:\s*[a-zA-Z0-9À-ÖØ-öø-ÿ]+)*$/.test(str);
}

export function validateEmail(str: string): boolean{
    return /^\S[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}\S$/.test(str);
}
