/**
 * @type {HTMLAudioElement}
 */
const audioElement = document.getElementById("audio_source");
const onclick = () => {
    const context = new AudioContext();
    const source = new MediaElementAudioSourceNode(context, {
        mediaElement: audioElement
    });
    const splitter = new ChannelSplitterNode(context, {
        channelCount: 2,
        numberOfOutputs: 2
    });
    source.connect(splitter);
    const inverter = new GainNode(context, {
        gain: -1
    });
    splitter.connect(inverter, 0);
    splitter.connect(context.destination, 1);
    inverter.connect(context.destination);
    document.removeEventListener("click", onclick);
}
const input = document.getElementById("file_input");
input.onchange = () => {
    if(!input.files[0])
    {
        return;
    }
    const file = input.files[0];
    audioElement.src = URL.createObjectURL(file);
    audioElement.play().then();
    document.getElementById("file_label").textContent = file.name;
    
}
document.addEventListener("click", onclick)