﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class TipKarte
    {
        [Key]
        public string Tip { get; set; }

        public float Cena { get; set; }

        public virtual ICollection<Stavka> Stavkas { get; set; } 
    }
}