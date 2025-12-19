# Ergogen
###### Dec 14, 2025
Ergogen is a program for making ergonomic mechanical keyboards
Today (Which depends on when you are viewing it)
We (I) Will start designing a mechanical keyboard with ergogen.
The first step is to design the layout in the `points:` section.
think of each point being the center of a key.
Next, you have to make outlines for your keyboard.
This is done in the `outlines:` section. I have defined two outlines for you to make it easier, preview and outline.
You will customize the outline _outline. The outline _outline is the base outline.
Once you are done defining your outlines:
You need to define the pcb! I already have defined some footprints for you, so you only need to place the trrs jack for communication, the microcontroller to make it work, define which outline you want to use for the pcb, and define column and row nets back in the `points:` section

Start by pasting this code into [ergogen](https://ergogen.ceoloide.com):
```
# This is a starter code for designing wired choc keyboards with ergogen.
# Please feel free to use it however you want. (You may not use it against anyone)
#
# To start:
# Define your points
# Define your outlines (Redo _outline but leave preview and outline alone)
# (Optional) Define your cases
# Make sure the pcb is referencing the right outline and place the trrs jack and mcu
# Export your files and route your pcb and, Tada! You're done! (Don't forget to buy the parts and get the pcb machined)

metadata:
  engine: 4.1.0

units:
  kx: cx
  ky: cy
  $default_width: cx
  $default_height: cy
  $default_spread: cx
  $default_padding: cy

points:
  zones:
    main:
      anchor:
        shift: [150, -200]
      columns:
      rows:

outlines:
  preview:
    - what: rectangle
      where: true
      size: [17.5, 16.5]
  _outline:
    - what: rectangle
      where: true
      size: [kx, ky]
      expand: 2
      joints: 1 
  outline:
    - name: _outline
      fillet: 2

cases:

pcbs:
  main:
    template: kicad8
    outlines:
      main.outline: outline
    footprints:
      choc:
        what: ceoloide/switch_choc_v1_v2
        where: true
        params:
          reversible: true
          hotswap: true
          solder: true
          choc_v2_support: false
          include_keycap: true
          keycap_width: 17.5
          keycap_height: 16.5
          from: "{{column_net}}"
          to: "{{colrow}}"
      diode: 
        what: ceoloide/diode_tht_sod123
        where: true
        adjust:
          shift: [0, -3.3]
        params:
          reversible: true
          from: "{{colrow}}"
          to: "{{row_net}}"
      trrs:
        what: ceoloide/trrs_pj320a
        params:
          reversible: true
          TP: VCC
          SL: GND
          R2: P9
      mcu:
        what: ceoloide/mcu_nice_nano
        params:
          reversible: true
```
Now customize it!
in `points.zones.main` Add rows and columns!
```
points:
  zones:
    main:
      anchor:
        shift: [150, -200]
      columns:
        pinky:
        ring:
        middle:
        index:
      rows:
        bottom:
        home:
        top:
```
Now let's add some column stagger!
```
columns:
  pinky:
  ring:
    key.stagger: 0.4ky
  middle:
    key.stagger: 0.4ky
  index:
    key.stagger: -0.4ky
```