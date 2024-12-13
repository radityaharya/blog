export function idify(input?: string) {
    if (!input) return '';

    // make lower case and trim
    var id = input.toLowerCase().trim();

    // remove accents from charaters
    id = id.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // replace invalid chars with spaces
    id = id.replace(/[^a-z0-9\s-]/g, ' ').trim();

    // replace multiple spaces or hyphens with a single hyphen
    id = id.replace(/[\s-]+/g, '-');

    return id;
}
