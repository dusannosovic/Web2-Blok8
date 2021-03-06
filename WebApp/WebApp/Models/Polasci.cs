﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Polasci
    {
        
        public int Id { get; set; }
        public Dan Dan { get; set; }
        public TimeSpan VremePolaska { get; set; }
        
        public bool IsDeleted { get; set; }
        public virtual ICollection<Linija> Linijas { get; set; }
    }
}
