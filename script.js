const ctx = new AudioContext();

function brownNoise() {
    let buffer = ctx.createBuffer(1, 4096, ctx.sampleRate);
    let output = buffer.getChannelData(0);
    var lastOut = 0.0;
    for (var i = 0; i < 4096; i++) {
        var white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
    }
    return buffer;
}

function startNoise() {
    const noise = new AudioBufferSourceNode(ctx, {
        buffer: brownNoise(),
    });
    noise.connect(ctx.destination);
    while (true) {
        noise.start();
    }

    // return buffer;
    /*
    bufferSize = bufferSize || 4096;
    var lastOut = 0.0;
    var node = ctx.createScriptProcessor(bufferSize, 1, 1);
    node.onaudioprocess = function(e) {
        var output = e.outputBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            var white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // (roughly) compensate for gain
        }
    }
    return node;
    */
}