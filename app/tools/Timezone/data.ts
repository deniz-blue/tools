export const TZ_INTL = Intl.supportedValuesOf("timeZone").filter(x => !x.startsWith("Etc/"));

// Common timezone abbreviations mapped to canonical IANA zones.
// Note: many abbreviations are ambiguous, we pick a "standard" representative.
export const TZ_ABBREVIATIONS: Record<string, string> = {
    // UTC+-N
    
    
    //* from this point on, @author ChatGPT

    // Europe
    CET: "Europe/Paris",     // Central European Time
    CEST: "Europe/Paris",    // Central European Summer Time
    WET: "Europe/Lisbon",    // Western European Time
    WEST: "Europe/Lisbon",   // Western European Summer Time
    EET: "Europe/Helsinki",  // Eastern European Time
    EEST: "Europe/Helsinki", // Eastern European Summer Time
    GMT: "Etc/GMT",          // Greenwich Mean Time
    BST: "Europe/London",    // British Summer Time

    // US / Americas
    EST: "America/New_York",
    EDT: "America/New_York",
    CST: "America/Chicago",
    CDT: "America/Chicago",
    MST: "America/Denver",
    MDT: "America/Denver",
    PST: "America/Los_Angeles",
    PDT: "America/Los_Angeles",

    AST: "America/Halifax",  // Atlantic Standard Time
    ADT: "America/Halifax",  // Atlantic Daylight Time
    NST: "America/St_Johns", // Newfoundland Standard
    NDT: "America/St_Johns", // Newfoundland Daylight

    // Asia
    IST: "Asia/Kolkata",     // India Standard Time (⚠️ also Ireland!)
    PKT: "Asia/Karachi",     // Pakistan Standard Time
    ICT: "Asia/Bangkok",     // Indochina Time
    WIB: "Asia/Jakarta",     // Western Indonesian Time
    WITA: "Asia/Makassar",   // Central Indonesian Time
    WIT: "Asia/Jayapura",    // Eastern Indonesian Time
    CSTASIA: "Asia/Shanghai",// distinguish from US CST
    JST: "Asia/Tokyo",
    KST: "Asia/Seoul",
    HKT: "Asia/Hong_Kong",

    // Australia / Oceania
    AEST: "Australia/Sydney",
    AEDT: "Australia/Sydney",
    ACST: "Australia/Adelaide",
    ACDT: "Australia/Adelaide",
    AWST: "Australia/Perth",
    NZST: "Pacific/Auckland",
    NZDT: "Pacific/Auckland",

    // Middle East
    TRT: "Europe/Istanbul",  // Turkey
    IDT: "Asia/Jerusalem",   // Israel Daylight
    ISTIL: "Asia/Jerusalem", // alias
    GST: "Asia/Dubai",       // Gulf Standard

    // Africa
    SAST: "Africa/Johannesburg",
    EAT: "Africa/Nairobi",
    WAT: "Africa/Lagos",
};
