import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaListUl, FaListOl } from "react-icons/fa";
import { FaCircle, FaPlus, FaTable, FaImage, FaVideo, FaLink, FaUndo, FaRedo } from "react-icons/fa";
import ChunkPin from "./chunkpin/ChunkPin";
import ChunkPinAdder from "./chunkpin-adder/ChunkPinAdder";
import LogoutButton from "./logout-button/LogoutButton";
import "./chunk.scss";

import { useState, useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import ContentEditable from "react-contenteditable";

const Chunk = () => {
    const [signal, setSignal] = useState(0);
    
    const [signal1Color, setSignal1Color] = useState("darkgray");

    useEffect(() => {
        makeRequest.get('/finalchunks')
        .then((response) => {
            if(response.data){
                console.log(response.data[0].content)
                setContent(response.data[0].content )
            }
        })

        .catch(error => {
            console.error('there was an error while fetching the content: ', error)
        })
    }, []);

    function handleClickSignal1() {
        if(signal !== 1) {
            setSignal(signal => 1);
            setSignal1Color(signal1Color => "red");
        }
        else {
            setSignal(signal => 0);
            setSignal1Color(signal1Color => "darkgray");
        }
        setSignal2Color(signal2Color => "darkgray");
        setSignal3Color(signal3Color => "darkgray");
        setSignal4Color(signal4Color => "darkgray");
    };

    const [signal2Color, setSignal2Color] = useState("darkgray");
    function handleClickSignal2() {
        if(signal !== 2) {
            setSignal(signal => 2);
            setSignal2Color(signal2Color => "orange");
        }
        else {
            setSignal(signal => 0);
            setSignal2Color(signal2Color => "darkgray");
        }
        setSignal1Color(signal1Color => "darkgray");
        setSignal3Color(signal3Color => "darkgray");
        setSignal4Color(signal4Color => "darkgray");
    };

    const [signal3Color, setSignal3Color] = useState("darkgray");
    function handleClickSignal3() {
        if(signal !== 3) {
            setSignal(signal => 3);
            setSignal3Color(signal3Color => "greenyellow");
        }
        else {
            setSignal(signal => 0);
            setSignal3Color(signal3Color => "darkgray");
        }
        setSignal1Color(signal1Color => "darkgray");
        setSignal2Color(signal2Color => "darkgray");
        setSignal4Color(signal4Color => "darkgray");
    };

    const [signal4Color, setSignal4Color] = useState("darkgray");
    function handleClickSignal4() {
        if(signal !== 4) {
            setSignal(signal => 4);
            setSignal3Color(signal3Color => "greenyellow");
            setSignal4Color(signal4Color => "greenyellow");
        }
        else {
            setSignal(signal => 0);
            setSignal3Color(signal3Color => "darkgray");
            setSignal4Color(signal4Color => "darkgray");
        }
        setSignal1Color(signal1Color => "darkgray");
        setSignal2Color(signal2Color => "darkgray");
    };

    const [content, setContent] = useState("");

    const onTextChanged = (e) => {
        setContent(e.target.value)
    }

    const { currentUser } = useContext(AuthContext);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newFinalChunk) => {
            return makeRequest.post("/finalchunks", newFinalChunk)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["finalchunks"]})
        },
    });

    const handleClickSaveFinalChunk = async(e) => {
        e.preventDefault();
        mutation.mutate({ content, signal });
    };

    return (
        <div className="chunk-page">
            <div className="central-workspace">
                <div className="top-bar">
                    <div className="chunk-title">Notes on - Formalized Music: Thought and Mathematics in Composition</div>
                </div>
                <div className="chunk-board">
                    <div className="progress-chunk">
                        <ChunkPinAdder />

                        <ChunkPin />
                        <ChunkPinAdder />

                        <div className="progress-chunk-pin">
                            <div className="progress-chunk-pin-top-bar">
                                <div className="progress-chunk-pin-title">Page 12</div>
                                <div className="text-editor-block">
                                    <FaBold className="text-editor-icon" />
                                    <FaItalic className="text-editor-icon" />
                                    <FaUnderline className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaAlignLeft className="text-editor-icon" />
                                    <FaAlignCenter className="text-editor-icon" />
                                    <FaAlignRight className="text-editor-icon" />
                                    <FaAlignJustify className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaListUl className="text-editor-icon" />
                                    <FaListOl className="text-editor-icon" />
                                    <FaTable className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaImage className="text-editor-icon" />
                                    <FaVideo className="text-editor-icon" />
                                    <FaLink className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaUndo className="text-editor-icon" />
                                    <FaRedo className="text-editor-icon" />
                                </div>
                                <div className="save-button">Save</div>
                            </div>
                            <div className="progress-chunk-pin-content">
                                <div className="progress-chunk-pin-left">
                                    <img src={require("../../assets/demo-scans/12.jpg")} alt="" />
                                </div>
                                <div className="progress-chunk-pin-right">
                                    <div className="progress-chunk-pin-text">
                                        Assume a given duration and a set of sound-points
                                        defined in the intensity-pitch space realized during this duration.
                                        Given the mean superficial density of this tone cluster,
                                        what is the probability of a particular density occurring in a given region
                                        of the intensity-pitch space?
                                        Poisson’s Law answers this question.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="progress-chunk-pin-adder">
                            <FaPlus className="progress-chunk-pin-adder-icon" />
                        </div>

                        <div className="progress-chunk-pin">
                            <div className="progress-chunk-pin-top-bar">
                                <div className="progress-chunk-pin-title">Page 64</div>
                                <div className="text-editor-block">
                                    <FaBold className="text-editor-icon" />
                                    <FaItalic className="text-editor-icon" />
                                    <FaUnderline className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaAlignLeft className="text-editor-icon" />
                                    <FaAlignCenter className="text-editor-icon" />
                                    <FaAlignRight className="text-editor-icon" />
                                    <FaAlignJustify className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaListUl className="text-editor-icon" />
                                    <FaListOl className="text-editor-icon" />
                                    <FaTable className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaImage className="text-editor-icon" />
                                    <FaVideo className="text-editor-icon" />
                                    <FaLink className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaUndo className="text-editor-icon" />
                                    <FaRedo className="text-editor-icon" />
                                </div>
                                <div className="save-button">Save</div>
                            </div>
                            <div className="progress-chunk-pin-content">
                                <div className="progress-chunk-pin-left">
                                    <img src={require("../../assets/demo-scans/64.jpg")} alt="" />
                                </div>
                                <div className="progress-chunk-pin-right">
                                    <div className="progress-chunk-pin-text">
                                        It will have a given mean entropy.
                                        At a defined time, we will cause it to undergo a transformation.
                                        From the point of view of ataxy, this transformation can have one of three effects:
                                        <ol>
                                            <li>
                                                The degree of complexity (variety) does not change;
                                                the transformation is neutral; and the overall entropy does not change.
                                            </li>
                                            <li>The degree of complexity increases and so does the entropy.</li>
                                            <li>The transformation is a simplifying one, and the entropy diminishes.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="progress-chunk-pin-adder">
                            <FaPlus className="progress-chunk-pin-adder-icon" />
                        </div>

                        <div className="progress-chunk-pin">
                            <div className="progress-chunk-pin-top-bar">
                                <div className="progress-chunk-pin-title">Page 65</div>
                                <div className="text-editor-block">
                                    <FaBold className="text-editor-icon" />
                                    <FaItalic className="text-editor-icon" />
                                    <FaUnderline className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaAlignLeft className="text-editor-icon" />
                                    <FaAlignCenter className="text-editor-icon" />
                                    <FaAlignRight className="text-editor-icon" />
                                    <FaAlignJustify className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaListUl className="text-editor-icon" />
                                    <FaListOl className="text-editor-icon" />
                                    <FaTable className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaImage className="text-editor-icon" />
                                    <FaVideo className="text-editor-icon" />
                                    <FaLink className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaUndo className="text-editor-icon" />
                                    <FaRedo className="text-editor-icon" />
                                </div>
                                <div className="save-button">Save</div>
                            </div>
                            <div className="progress-chunk-pin-content">
                                <div className="progress-chunk-pin-left">
                                    <img src={require("../../assets/demo-scans/65.jpg")} alt="" />
                                </div>
                                <div className="progress-chunk-pin-right">
                                    <div className="progress-chunk-pin-text">
                                        And simplifying transformation transforms:
                                        <li>Perfect disorder into partial disorder</li>
                                        <li>Partial order into greater order</li>
                                        <li>Partial order into perfect order</li>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="progress-chunk-pin-adder">
                            <FaPlus className="progress-chunk-pin-adder-icon" />
                        </div>

                        <div className="progress-chunk-pin">
                            <div className="progress-chunk-pin-top-bar">
                                <div className="progress-chunk-pin-title">Page 66</div>
                                <div className="text-editor-block">
                                    <FaBold className="text-editor-icon" />
                                    <FaItalic className="text-editor-icon" />
                                    <FaUnderline className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaAlignLeft className="text-editor-icon" />
                                    <FaAlignCenter className="text-editor-icon" />
                                    <FaAlignRight className="text-editor-icon" />
                                    <FaAlignJustify className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaListUl className="text-editor-icon" />
                                    <FaListOl className="text-editor-icon" />
                                    <FaTable className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaImage className="text-editor-icon" />
                                    <FaVideo className="text-editor-icon" />
                                    <FaLink className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaUndo className="text-editor-icon" />
                                    <FaRedo className="text-editor-icon" />
                                </div>
                                <div className="save-button">Save</div>
                            </div>
                            <div className="progress-chunk-pin-content">
                                <div className="progress-chunk-pin-left">
                                    <img src={require("../../assets/demo-scans/66.jpg")} alt="" />
                                </div>
                                <div className="progress-chunk-pin-right">
                                    <div className="progress-chunk-pin-text">
                                        <li>
                                            Let there be a very large number of grains distributed at random
                                            over the whole range of the audible area
                                            and lasting an interval of time equal to Δt.
                                        </li>
                                        <li>
                                            Let there also be a grid fine enough so that the average density
                                            will not be more than 30 grains per cell.
                                        </li>
                                        <li>The distribution law is then given by Poisson’s formula</li>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="progress-chunk-pin-adder">
                            <FaPlus className="progress-chunk-pin-adder-icon" />
                        </div>

                        <div className="progress-chunk-pin">
                            <div className="progress-chunk-pin-top-bar">
                                <div className="progress-chunk-pin-title">Page 67</div>
                                <div className="text-editor-block">
                                    <FaBold className="text-editor-icon" />
                                    <FaItalic className="text-editor-icon" />
                                    <FaUnderline className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaAlignLeft className="text-editor-icon" />
                                    <FaAlignCenter className="text-editor-icon" />
                                    <FaAlignRight className="text-editor-icon" />
                                    <FaAlignJustify className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaListUl className="text-editor-icon" />
                                    <FaListOl className="text-editor-icon" />
                                    <FaTable className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaImage className="text-editor-icon" />
                                    <FaVideo className="text-editor-icon" />
                                    <FaLink className="text-editor-icon" />
                                </div>
                                <div className="text-editor-block">
                                    <FaUndo className="text-editor-icon" />
                                    <FaRedo className="text-editor-icon" />
                                </div>
                                <div className="save-button">Save</div>
                            </div>
                            <div className="progress-chunk-pin-content">
                                <div className="progress-chunk-pin-left">
                                    <img src={require("../../assets/demo-scans/67.jpg")} alt="" />
                                </div>
                                <div className="progress-chunk-pin-right">
                                    <div className="progress-chunk-pin-text">
                                        For a very high mean density, the screens in which disorder is perfect (maximum)
                                        will give a very rich sound, almost a white sound,
                                        which will never be identical throughout time.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="progress-chunk-pin-adder">
                            <FaPlus className="progress-chunk-pin-adder-icon" />
                        </div>
                    </div>
                    <div className="final-chunk">
                        <div className="toolbar">
                            <div className="signal">
                                <FaCircle className="signal-1" style={{ color: signal1Color }} onClick={handleClickSignal1} />
                                <FaCircle className="signal-2" style={{ color: signal2Color }} onClick={handleClickSignal2} />
                                <FaCircle className="signal-3" style={{ color: signal3Color }} onClick={handleClickSignal3} />
                                <FaCircle className="signal-4" style={{ color: signal4Color }} onClick={handleClickSignal4} />
                            </div>
                            <div className="text-editor-block">
                                <FaBold className="text-editor-icon" />
                                <FaItalic className="text-editor-icon" />
                                <FaUnderline className="text-editor-icon" />
                            </div>
                            <div className="text-editor-block">
                                <FaAlignLeft className="text-editor-icon" />
                                <FaAlignCenter className="text-editor-icon" />
                                <FaAlignRight className="text-editor-icon" />
                                <FaAlignJustify className="text-editor-icon" />
                            </div>
                            <div className="text-editor-block">
                                <FaListUl className="text-editor-icon" />
                                <FaListOl className="text-editor-icon" />
                                <FaTable className="text-editor-icon" />
                            </div>
                            <div className="text-editor-block">
                                <FaImage className="text-editor-icon" />
                                <FaVideo className="text-editor-icon" />
                                <FaLink className="text-editor-icon" />
                            </div>
                            <div className="text-editor-block">
                                <FaUndo className="text-editor-icon" />
                                <FaRedo className="text-editor-icon" />
                            </div>
                            <button className="save-button" onClick={handleClickSaveFinalChunk}>Save</button>
                        </div>                        
                        <ContentEditable
                            html={content}
                            className="final-chunk-content"
                            onChange={onTextChanged}
                        />
                        
                    </div>
                </div>
                <div className="bottom-bar">
                    <button><LogoutButton /></button>
                </div>
            </div>
        </div>
    );
};

export default Chunk;

/*
In addition to these simple transformations,
Xenakis introduced transformations based on probability theory.
For instance, the Poisson distribution is used to calculate the probability
that a specified number of events would occur over a specified time period.
Thus, we may use the Poisson distribution to model the density of sound grains
across a two-dimensional screen defined by frequency/pitch and amplitude/loudness.
The density of sound grains across a screen is reflective of the “orderliness” of the sound grains -
the higher the density, the higher the disorderliness, and vice versa.
Thus, orderliness refers to the frequency (F) and intensity/amplitude (G) patterns
of a set of sound grains at a specific moment in time.
We may define orderliness into three states: perfect disorder, partial disorder, and perfect order.
If the frequencies (F) or intensities (G) of a set of sound grains at a specific moment
is scattered randomly across the full range of frequencies (F) or intensities (G) of a piece of music,
the frequency (F) or intensity (G) is said to be in a state of “perfect disorder”.
If the frequencies (F) or intensities (G) of a set of sound grains at a specific moment
is scattered randomly across a specified range of frequencies (F) or intensities (G),
the frequency (F) or intensity (G) is said to be in a state of “partial disorder”.
If the frequencies (F) or intensities (G) of a set of sound grains at a specific moment
is concentrated at a specific frequency (F) or intensity (G),
the frequency (F) or intensity (G) is said to be in a state of “perfect order”.
Thus, there are nine possible conditions:
<ol>
    <li>Perfect disorder in both frequency (F) and intensity (G) - a.k.a. white noise</li>
    <li>Perfect disorder in frequency (F) and partial disorder in intensity (G)</li>
    <li>Perfect disorder in frequency (F) and perfect order in intensity (G)</li>
    <li>Partial disorder in frequency (F) and perfect disorder in intensity (G)</li>
    <li>Partial disorder in both frequency (F) and intensity (G)</li>
    <li>Partial disorder in frequency (F) and perfect order in intensity (G)</li>
    <li>Perfect order in frequency (F) and perfect disorder in intensity (G)</li>
    <li>Perfect order in frequency (F) and partial disorder in intensity (G)</li>
    <li>Perfect order in both frequency (F)</li>
</ol>
*/