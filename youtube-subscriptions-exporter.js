// youtube-subscriptions-exporter.js
(async () => {
    // Scroll the page slowly to load all subscriptions
    for (let i = 0; i < 20; i++) { 
        window.scrollBy(0, window.innerHeight);
        await new Promise(r => setTimeout(r, 500));
    }

    const links = Array.from(document.querySelectorAll('ytd-channel-renderer a'))
        .map(a => a.href)
        .filter(href => href.startsWith('https://www.youtube.com/@'));

    const uniqueLinks = [...new Set(links)];

    if (uniqueLinks.length === 0) {
        alert('No subscribed channels found. Make sure you scroll enough!');
        return;
    }

    const blob = new Blob([uniqueLinks.join('\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'subscribed_channels.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    console.log(`Downloaded ${uniqueLinks.length} subscribed channel URLs.`);
})();
