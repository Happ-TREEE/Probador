import trimesh

# Cargar modelo (puede ser GLB, OBJ, STL, etc.)
maniqui = trimesh.load("maniqui_realista.glb")

# Mostrar en visor
maniqui.show()
