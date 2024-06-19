from django.db import models

class Run(models.Model):
  UNION = "Union"
  GRAND_CENTRAL = "Grand Central"
  PENN = "Penn"
  TIMES_SQ = "Times Square"
  CANAL = "Canal"
  
  TERMINAL_CHOICES = (
    ( UNION, "Union Square Station"),
    ( GRAND_CENTRAL, "Grand Central Station"),
    ( PENN, "Penn Station"),
    ( TIMES_SQ, "Times Square - 42nd Street Station"),
    ( CANAL, "Canal Street Station")
    )

  proper_name = models.CharField(max_length=200)
  start_time = models.TimeField()
  end_time = models.TimeField()
  start_terminal = models.CharField(choices = TERMINAL_CHOICES, max_length=2)
  end_terminal = models.CharField(choices = TERMINAL_CHOICES, max_length=2)
