// SPDX-FileCopyrightText: 2024 PatLab <patlab@proton.me>
//
// SPDX-License-Identifier: GPL-2.0-only OR GPL-3.0-only OR LicenseRef-KDE-Accepted-GPL

.pragma library

// A robust, centralized function to load and parse the services.json file.
// It requires the 'plasmoid' object to be passed in, ensuring that the
// file path is always resolved correctly, regardless of the QML context
// (main UI, configuration dialog, etc.).
function loadServices(plasmoid) {
    var xhr = new XMLHttpRequest();
    var path = plasmoid.file("", "services.json");

    xhr.open("GET", path, false); // Synchronous request is acceptable for local files on startup
    xhr.send();

    if (xhr.status === 200 || xhr.status === 0) { // status 0 is typical for local 'file://' URLs
        try {
            return JSON.parse(xhr.responseText);
        } catch (e) {
            console.error("webpat-plasmoid: Failed to parse services.json:", e);
            return [];
        }
    } else {
        console.error("webpat-plasmoid: Failed to load services.json. Status:", xhr.status, "URL:", path);
        return [];
    }
}
