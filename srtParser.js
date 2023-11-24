<script>

    function timestampToSeconds(srtTimestamp) {
        const [rest, millisecondsString] = srtTimestamp.split(",");
        const milliseconds = parseInt(millisecondsString);
        const [hours, minutes, seconds] = rest.split(":").map((x) => parseInt(x));
        const result = milliseconds * 0.001 + seconds + 60 * minutes + 3600 * hours;
        return Math.round(result * 1000) / 1000;
    }

    function correctFormat(time) {
        return time.replace(".", ",");
    }

    function fixed_str_digit(how_many_digit, str, padEnd = true) {
        if (str.length == how_many_digit) {
            return str;
        }
        if (str.length > how_many_digit) {
            return str.slice(0, how_many_digit);
        }
        if (str.length < how_many_digit) {
            if (padEnd) {
                return str.padEnd(how_many_digit, "0");
            } else {
                return str.padStart(how_many_digit, "0");
            }
        }
    }

    function tryComma(data) {
        data = data.replace(/\r/g, "");
        var regex = /(\d+)\n(\d{1,2}:\d{2}:\d{2},\d{1,3}) --> (\d{1,2}:\d{2}:\d{2},\d{1,3})/g;
        return data.match(regex) || [];
    }

    function tryDot(data) {
        data = data.replace(/\r/g, "");
        var regex = /(\d+)\n(\d{1,2}:\d{2}:\d{2}\.\d{1,3}) --> (\d{1,2}:\d{2}:\d{2}\.\d{1,3})/g;
        return data.match(regex) || [];
    }



    function fromSrt(data) {
        var regex = /(\d+)\n(\d{1,2}:\d{2}:\d{2},\d{1,3}) --> (\d{1,2}:\d{2}:\d{2},\d{1,3})\n([\s\S]*?)(?=\n\d|$)/g;
        var matches = [...data.matchAll(regex)];

        var items = matches.map(match => {
            const startTime = correctFormat(match[2].trim());
            const endTime = correctFormat(match[3].trim());
            return {
                id: match[1].trim(),
                startTime,
                startSeconds: timestampToSeconds(startTime),
                endTime,
                endSeconds: timestampToSeconds(endTime),
                text: match[4].trim(),
            };
        });
        return items;
    }
        
    function toSrt(data) {
        const end_of_line = "\r\n";
        return data.map(s => `${s.id}${end_of_line}${s.startTime} --> ${s.endTime}${end_of_line}${s.text}${end_of_line}`).join(end_of_line + end_of_line);
    }


// Example SRT content

const srtContent = `
1
00:02:17,440 --> 00:02:20,375
Senator, we're making
our approach into Coruscant.

2
00:02:20,476 --> 00:02:22,501
Very good, Lieutenant.

3
00:02:24,948 --> 00:02:26,247
Whose side is time on?

4
00:02:36,389 --> 00:02:39,290
vaaaa

5
00:02:41,000 --> 00:02:43,295
[speaks Icelandic]

6
00:02:45,000 --> 00:02:48,295
man 3 The admiral
begins his expedition
`;

    // Use the functions
    const subtitles = fromSrt(srtContent);
    console.log(subtitles);

    const srtString = toSrt(subtitles);
    console.log(srtString);


</script>
