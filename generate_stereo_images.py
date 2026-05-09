#!/usr/bin/env python3
"""
Generate stereo tricks lesson images using Gemini API
"""
import os
from google import genai
from google.genai import types

# Check for API key
if "GEMINI_API_KEY" not in os.environ:
    print("Error: GEMINI_API_KEY environment variable not set")
    exit(1)

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

# Image descriptions for stereo tricks lesson
images = [
    {
        "filename": "step1_stereo_field_basics.png",
        "prompt": "Educational diagram showing stereo field basics for music production. Top-down view of stereo field with center, left, and right positions clearly marked. Show placement zones for different instruments: kick/snare/bass/lead vocal in center (0°), rhythm instruments at 30-45°, supporting elements at 60-90°. Clean, professional diagram with labels, soft gradients, and a light background suitable for a technical manual."
    },
    {
        "filename": "step2_pan_controls.png",
        "prompt": "Logic Pro channel strip showing pan control knob in detail. Clean interface screenshot style showing the circular pan knob, stereo balance indicator, and right-click menu options including 'Stereo Pan' and 'Balance' modes. Light interface background, clear labels, professional DAW aesthetic matching Logic Pro's design language."
    },
    {
        "filename": "step3_pan_law_comparison.png",
        "prompt": "Comparison chart showing three pan law types: -3dB, -4.5dB, and -6dB. Three circular diagrams side by side, each showing how signal level changes from left to center to right. Graphs below each showing the attenuation curve. Clean technical illustration with light background, labeled axes, and clear numerical values for educational purposes."
    },
    {
        "filename": "step4_direction_mixer.png",
        "prompt": "Logic Pro Direction Mixer plugin interface. Professional plugin window showing Direction knob (0-180°), Spread slider (0-200%), mode selector (LR/Split/MS), and visual stereo field display. Clean, modern plugin UI with light background, clear parameter labels, and professional appearance matching Logic Pro's plugin design."
    },
    {
        "filename": "step5_spread_comparison.png",
        "prompt": "Before and after comparison showing stereo width adjustment. Two waveform displays side by side: left shows narrow stereo signal (Spread 50%), right shows wide stereo signal (Spread 150%). Visual representation with stereo scope meters below each waveform. Professional audio software aesthetic, light background, clear labels showing the difference in stereo width."
    },
    {
        "filename": "step6_midside_diagram.png",
        "prompt": "Mid-Side processing diagram showing signal flow. Top section shows stereo LR input splitting into M (Mid) and S (Side) channels. Middle shows separate EQ processing for each channel. Bottom shows M+S recombination into LR stereo output. Clean technical flowchart with arrows, boxes, and waveform representations. Light background, educational style."
    },
    {
        "filename": "step7_midside_eq.png",
        "prompt": "Logic Pro Channel EQ in Mid-Side mode. Plugin interface showing two separate EQ curves: top half labeled 'MID' with centered frequency cuts/boosts, bottom half labeled 'SIDE' with different EQ curve. Clean plugin UI with frequency spectrum display, light background, professional appearance matching Logic Pro's interface design."
    },
    {
        "filename": "step8_haas_effect.png",
        "prompt": "Haas effect timing diagram showing audio delay technique. Timeline showing original sound wave at 0ms and delayed copy at 15ms. Visual representation with two waveforms, one slightly offset, with timing markers. Perception bubble showing 'Single wide sound image'. Clean educational diagram with light background and clear timing annotations."
    },
    {
        "filename": "step9_double_tracking.png",
        "prompt": "Double tracking recording setup in Logic Pro. Two identical tracks shown side by side, labeled 'Guitar L' and 'Guitar R' with different waveforms showing natural timing variations. Pan indicators showing hard left (-64) and hard right (+63). Colorful track colors, professional DAW layout, light interface background."
    },
    {
        "filename": "step10_stereo_delay.png",
        "prompt": "Logic Pro Stereo Delay plugin interface. Professional delay plugin showing separate left and right delay time controls, feedback parameters, crossfeed routing diagram, and visual delay time grid. Clean modern plugin UI with light background, clear parameter labels, and stereo visualization matching Logic Pro's design aesthetic."
    },
    {
        "filename": "step11_correlation_meter.png",
        "prompt": "Correlation meter display showing three states. Three vertical meters side by side: left showing +1.0 (perfectly mono, green), center showing 0.0 (decorrelated stereo, yellow), right showing -0.5 (phase issues, red warning). Clean meter design with numerical values, color coding, and labels explaining each state. Light background, professional metering aesthetic."
    },
    {
        "filename": "step12_mono_check.png",
        "prompt": "Mono compatibility check workflow. Split screen showing Logic Pro mixer with stereo output channel. Left side shows normal stereo mode with stereo indicators. Right side shows mono button engaged with visual indication. Arrows pointing to mono button location. Professional DAW interface, light background, clear visual distinction between modes."
    },
    {
        "filename": "step13_split_mode.png",
        "prompt": "Direction Mixer in Split mode for frequency-dependent stereo control. Plugin interface showing low-frequency band (below 200Hz) with narrow spread (20%), high-frequency band (above 200Hz) with wide spread (120%). Frequency spectrum display with crossover point clearly marked. Professional plugin UI, light background, clear parameter labels."
    },
    {
        "filename": "step14_binaural_panner.png",
        "prompt": "Binaural Panner spherical interface in Logic Pro. 3D sphere showing sound source positioning in 3D space with azimuth, elevation, and distance controls. Clean, modern spatial audio interface with coordinate grid, visual sound source indicator, and parameter controls. Professional appearance matching Logic Pro's design, light background."
    },
    {
        "filename": "step15_width_zones.png",
        "prompt": "Stereo width zones diagram for different instrument types. Circular radar-style chart showing recommended stereo placement zones: center zone (bass, kick, snare, lead vocal), inner zone 30-45° (rhythm guitars, keys), outer zone 60-90° (pads, effects, background vocals). Color-coded zones, clean professional diagram, light background, clear labels."
    },
    {
        "filename": "step16_phase_cancellation.png",
        "prompt": "Phase cancellation warning visualization. Two scenarios side by side: left shows compatible stereo (waveforms reinforcing), right shows phase cancellation (waveforms opposing). Waveform displays with + and - markings. Result meters below showing good vs weak mono fold-down. Educational diagram, light background, clear warning indicators."
    },
    {
        "filename": "step17_stereo_chain.png",
        "prompt": "Stereo imaging plugin rack in Logic Pro. Channel strip showing recommended signal flow: Direction Mixer > Channel EQ (MS mode) > Stereo Delay. Three plugin windows stacked vertically with arrows showing signal path. Professional DAW aesthetic, light interface, clear labeling of each processing stage."
    },
    {
        "filename": "step18_common_mistakes.png",
        "prompt": "Common stereo mistakes infographic. Four panels showing: 1) over-widened bass causing phase issues, 2) everything panned to extremes leaving empty center, 3) excessive Haas delay causing comb filtering, 4) no mono checking. Each panel with red X mark, clear illustrations, light background, educational warning style."
    },
    {
        "filename": "step19_workflow.png",
        "prompt": "Professional stereo mixing workflow checklist. Step-by-step flowchart showing: 1) Start with mono foundation, 2) Add basic panning, 3) Apply width enhancement, 4) Check phase correlation, 5) Verify mono compatibility, 6) Final stereo polish. Clean infographic style with numbered steps, icons, arrows, light background, professional layout."
    },
    {
        "filename": "step20_cheat_sheet.png",
        "prompt": "Stereo tricks quick reference cheat sheet. Grid layout showing 6 techniques with icons: Pan Law settings, Direction Mixer basics, MS EQ, Haas timing, Double tracking tips, Phase checking. Each cell with small diagram and key parameters. Compact, colorful, educational poster style, light background, clear typography."
    },
    {
        "filename": "step21_width_metering.png",
        "prompt": "Stereo width comparison before and after processing. Stereo vectorscope display showing three stages: narrow (before), optimal (processed), over-wide (warning). Each with circular vectorscope pattern and correlation meter value. Professional metering aesthetic, light background, clear labels showing safe vs unsafe width levels."
    },
    {
        "filename": "step22_stereo_automation.png",
        "prompt": "Advanced stereo automation in Logic Pro. Track automation lanes showing dynamic stereo width changes throughout a song: verse (narrow 60%), chorus (wide 120%), bridge (moderate 85%). Visual automation curves with labeled sections. Professional DAW appearance, light interface, clear section markers and values."
    }
]

output_dir = "public/assets/training/stereo-tricks"
os.makedirs(output_dir, exist_ok=True)

print(f"Generating {len(images)} images for stereo tricks lesson...")
print(f"Output directory: {output_dir}")
print()

for i, img_data in enumerate(images, 1):
    filename = img_data["filename"]
    prompt = img_data["prompt"]
    output_path = os.path.join(output_dir, filename)
    
    print(f"[{i}/{len(images)}] Generating {filename}...")
    
    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_modalities=['TEXT', 'IMAGE'],
                image_config=types.ImageConfig(
                    aspect_ratio="16:9",
                    image_size="2K"
                ),
            ),
        )
        
        # Save the image
        for part in response.parts:
            if part.inline_data:
                image = part.as_image()
                # Save as PNG format
                image.save(output_path, format="PNG")
                print(f"    ✓ Saved: {output_path}")
                break
        else:
            print(f"    ✗ No image generated for {filename}")
            
    except Exception as e:
        print(f"    ✗ Error generating {filename}: {e}")
        continue
    
    print()

print("Image generation complete!")
